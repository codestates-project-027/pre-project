const app = require('../index');
const request = require('supertest');
const https = require('https');
const agent = request.agent(app);
const { expect, assert } = require('chai');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

//mkcert에서 발급한 인증서를 사용하기 위한 코드입니다. 삭제하지 마세요!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Auth - Server', () => {
  describe('Protocol - HTTP over Secure', () => {
    it('🚩 HTTPS 프로토콜을 사용하는 서버여야 합니다.', () => {
      expect(app instanceof https.Server).to.equal(true);
    });
  });
  describe('POST /login', () => {
    let response;
    before(async () => {
      response = await agent.post('/login').send({
        checkedKeepLogin: false,
        loginInfo: {
          userId: 'kimcoding',
          password: '1234',
        },
      });
    });

    it('🚩 db에 존재하는 유저가 아니라면, 상태 코드 401와 함께 Not Authorized라는 메세지가 응답에 포함되어야 합니다.', async () => {
      const response = await agent.post('/login').send({
        checkedKeepLogin: true,
        loginInfo: {
          userId: 'parkhacker',
          password: 'malicious',
        },
      });

      expect(response.statusCode).to.equal(401);
      expect(response.text).to.equal('Not Authorized');
    });
    it('🚩 로그인에 성공했다면 /userinfo로 리다이렉트 되어야 합니다.', () => {
      expect(response.statusCode).to.equal(302);
      expect(response.headers.location).to.equal('/userinfo');
    });
    it('🚩 로그인 상태를 일시적으로 유지하는 요청이라면, Access Token만 보내야합니다.', () => {
      const accessToken = response.headers['set-cookie'].join(',');

      expect(accessToken).to.contain('access_jwt');
      expect(accessToken).not.to.contain('refresh_jwt');
      expect(accessToken).not.to.contains.oneOf(['Max-Age', 'Expires']);
    });
    it('🚩 로그인 상태를 유지하는 요청이라면, Access Token과 Refresh Token을 보내야합니다.', async () => {
      response = await agent.post('/login').send({
        checkedKeepLogin: true,
        loginInfo: {
          userId: 'kimcoding',
          password: '1234',
        },
      });

      const cookies = response.headers['set-cookie'].join(',');
      expect(cookies).to.include.string('refresh_jwt');
      expect(cookies).to.include.string('access_jwt');
      expect(cookies).to.contains.oneOf(['Max-Age', 'Expires']);
    });
  });
});
describe('GET /userinfo', () => {
  let response;
  before(async () => {
    response = await agent.post('/login').send({
      checkedKeepLogin: true,
      loginInfo: {
        userId: 'kimcoding',
        password: '1234',
      },
    });
  });
  it('🚩 쿠키에 저장된 Access Token과 Refresh Token 모두 만료되었다면 상태 코드 401을 보내야합니다.', async () => {
    const expiredToken = sign(
      { id: '0', email: 'kimcoding@authstates.com' },
      process.env.ACCESS_SECRET,
      { expiresIn: 0 }
    );
    const response = await agent
      .get('/userinfo')
      .set('Cookie', [`access_jwt=${expiredToken}`, `refresh_jwt=${expiredToken}`]);
    expect(response.statusCode).to.equal(401);
    expect(response.text).to.equal('Not Authorized');
  });
  it('🚩 쿠키에 저장된 Access Token이 검증되지 않았다면, 상태 코드 401와 함께 Not Authorized라는 메세지가 응답에 포함되어야 합니다.', async () => {
    const response = await agent.get('/userinfo').set('Cookie', ['access_jwt=malicious']);
    expect(response.statusCode).to.equal(401);
    expect(response.text).to.equal('Not Authorized');
  });
  it('🚩 쿠키에 저장된 Access Token이 없다면, Refresh Token을 이용해 Access Token이 다시 발급되어야 합니다.', async () => {
    const expiredToken = sign(
      { id: '0', email: 'kimcoding@authstates.com' },
      process.env.ACCESS_SECRET,
      { expiresIn: 0 }
    );
    const refreshToken = response.header['set-cookie'].filter((cookie) =>
      cookie.includes('refresh_jwt')
    )[0];
    const secondResponse = await agent
      .get('/userinfo')
      .set('Cookie', [refreshToken, `access_jwt=${expiredToken}`]);

    const cookies = secondResponse.headers['set-cookie'].join(',');

    expect(cookies).to.include.string('access_jwt');
    expect(cookies).not.to.include.string(expiredToken);
  });
  it('🚩 쿠키에 저장된 Access Token이 검증되었다면 해당하는 유저의 정보가 응답에 포함되어야 합니다.', async () => {
    const accessToken = response.header['set-cookie'].filter((cookie) =>
      cookie.includes('access_jwt')
    )[0];
    const secondResponse = await agent.get('/userinfo').set('Cookie', [accessToken]);
    const { userId, location, email } = secondResponse.body;

    expect(userId).to.equal('kimcoding');
    expect(location).to.equal('Seoul, South Korea');
    expect(email).to.equal('kimcoding@authstates.com');
    expect(secondResponse.body).not.to.haveOwnProperty('password');
  });
});
describe('POST /logout', () => {
  let response, resCookies, logoutResponse, accessToken, refreshToken;
  before(async () => {
    response = await agent.post('/login').send({
      checkedKeepLogin: true,
      loginInfo: {
        userId: 'kimcoding',
        password: '1234',
      },
    });
    resCookies = response.header['set-cookie'];
    accessToken = resCookies
      .filter((cookie) => cookie.includes('access_jwt'))[0]
      .split('; ')[0]
      .split('=')[1];
    refreshToken = resCookies
      .filter((cookie) => cookie.includes('refresh_jwt'))[0]
      .split('; ')[0]
      .split('=')[1];
    logoutResponse = await agent.post('/logout').set('Cookie', resCookies);
  });
  it('🚩 로그아웃 요청이 성공했다면, 205 상태코드로 응답해야 합니다.', () => {
    expect(logoutResponse.statusCode).to.equal(205);
  });
  it('🚩 로그아웃 요청 시 Access Token 및 Refresh Token이 초기화되어야 합니다.', () => {
    const logoutResCookies = logoutResponse.headers['set-cookie'].join(',');

    expect(logoutResCookies).not.to.include.string(accessToken);
    expect(logoutResCookies).not.to.include.string(refreshToken);
  });
});
