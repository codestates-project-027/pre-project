const { USER_DATA } = require('../../db/data');
const { verifyToken, generateToken } = require('../helper/tokenFunctions');

module.exports = async (req, res) => {
  const accessToken = req.cookies['access_jwt']; //CLI 요청 쿠키에 a.T가 실어져있으면 
  const refreshToken = req.cookies['refresh_jwt'];
  const accessPayload = await verifyToken('access', accessToken); //a.T 검증결과

  if (accessPayload) {
    
    const userInfo = { ...USER_DATA.filter((user) => user.id === accessPayload.id)[0] };//a.T id 검증결과
    
    if (!userInfo) {return res.status(401).send('Not Authorized');} //유저 정보가 없으면 무효한 토큰
    delete userInfo.password; //민감한 비번을 삭제후 userInfo 보내기
    return res.json(userInfo);

  } else if (refreshToken) {
    
    const refreshPayload = await verifyToken('refresh', refreshToken);

    const userInfo = USER_DATA.filter((user) => user.id === refreshPayload.id)[0]; //똑같이 id 검증.

    if (!refreshPayload) {return res.status(401).send('Not Authorized');} //이건 반대로, payload가 없으면 무효한 토큰

    const { accessToken } = await generateToken(userInfo); //r.T 유효하면 a.T 재생산
    res.cookie('access_jwt', accessToken, {
      domain: 'localhost',
      path: '/',
      sameSite: 'none',
      httpOnly: true,
      secure: true, // Expires 옵션이 없는 Session Cookie
    });

    return res.json({ ...userInfo, password: undefined }); //비번 삭제 후 보내기
  }
  return res.status(401).send('Not Authorized');
};
