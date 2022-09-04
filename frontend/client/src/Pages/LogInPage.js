import styled from 'styled-components';
import { useState } from 'react';
import { useJwt } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/LogoGlyphMd.svg';
import axios from 'axios';

const LogInPage = ({
  isLogin,
  loginRQHandler,
  setLoginInfo,
  loginInfo,
  setKeepLogin,
  keepLogin,
  errorMessage,
  jwtToken,
}) => {
  const navigate = useNavigate();
  const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  return (
    <>
      {isLogin ? (
        <>
          <div>login success</div>
          {setTimeout(function () {
            // const userInfo = parseJwt(jwtToken);
            // const answer = { questionId, contents: answerContents, userName };
            // const userInfo = { username: parseJwt(jwtToken).username, email: parseJwt(jwtToken).email };
            // // console.log(userInfo.email, userInfo.username);
            // localStorage.setItem('username', JSON.stringify(userInfo));
            navigate('/questionspage');
          }, 1)}
        </>
      ) : (
        <LoginGlobalStyle>
          <Logo style={{ marginTop: '-80px' }} />
          <div className="login--page--wrapper">
            <div className="button--wrapper">
              <Button style={GoogleColor}>Log in with Google</Button>
              <Button style={GithubColor}>Log in with GitHub</Button>
              <Button style={FBColor}>Log in with Facebook</Button>
            </div>

            <div className="loginform--wrapper">
              <div className="login--components--wrapper">
                <div className="label--input--button--wrapper">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    type="email"
                    onChange={handleInputValue('email')}
                  />

                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    type="password"
                    onChange={handleInputValue('password')}
                  />

                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked
                      onChange={() => setKeepLogin(!keepLogin)}
                    />
                    {' 로그인 상태 유지하기'}
                  </label>

                  <button onClick={loginRQHandler}>Log in</button>
                  {errorMessage ? (
                    <div id="alert-message" data-testid="alert-message">
                      {errorMessage}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </LoginGlobalStyle>
      )}
    </>
  );
};

export default LogInPage;

const LoginGlobalStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgb(241, 242, 243);
  .login--page--wrapper {
    margin-top: 40px;
  }
  .loginform--wrapper {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 330px;
    background-color: white;
    border-radius: 3px;
  }
  .login--components--wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15%;
    width: 200px;
    label {
      font-weight: bold;
    }
    input {
      margin-top: 10px;
      margin-bottom: 20px;
    }
    button {
      margin-top: 5px;
      height: 35px;
      width: 200px;
      background-color: rgb(67, 147, 247);
      border: none;
      color: white;
      font-weight: bold;
    }
    .label--input--button--wrapper {
      margin-top: 40px;
    }
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 40px;
  border-radius: 3px;
  margin-bottom: 10px;
`;
const GoogleColor = {
  backgroundColor: 'white',
  color: 'rgb(60,64,68)',
  border: '1px solid rgb(235,236,237)',
};

const GithubColor = {
  backgroundColor: 'rgb(48,51,55)',
  color: 'white',
};

const FBColor = {
  backgroundColor: 'rgb(62,83,148)',
  color: 'white',
};
