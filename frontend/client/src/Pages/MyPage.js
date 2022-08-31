import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

export default function Mypage({ userInfo, setIsLogin, setUserInfo }) {
  const logoutHandler = () => {
    return axios
      .post('https://localhost:4000/logout')
      .then((res) => {
        setUserInfo(null);
        setIsLogin(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <LoginGlobalStyle>
        <div className="container">
          <div className="left-box">
            <span>Welcome {`${userInfo.name}(${userInfo.userId})`}</span>
          </div>
          <div className="right-box">
            <h1>My Page</h1>
            <div className="input-field">
              <h3>내 정보</h3>
              <div className="userinfo-field">
                <div>{`💻 ${userInfo.position}`}</div>
                <div>{`📩 ${userInfo.email}`}</div>
                <div>{`📍 ${userInfo.location}`}</div>
                {/* <article>
              <h3>Bio</h3>
              <span>{userInfo.bio}</span>
            </article> */}
              </div>
              <button className="logout-btn" onClick={logoutHandler}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </LoginGlobalStyle>
    </>
  );
}

const LoginGlobalStyle = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
