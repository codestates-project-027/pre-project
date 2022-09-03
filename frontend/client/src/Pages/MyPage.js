import axios from 'axios';
import styled from 'styled-components';
import NotFoundPage from './NotFoundPage';

export default function Mypage({ userInfo, setIsLogin, setUserInfo, isLogin }) {
  const logoutHandler = () => {
   //cli에서 처리
  };

  return (
    <>
      {isLogin ? (
        <LoginGlobalStyle>
          <div className="container">
            <div className="left-box">
              <span>Welcome {`${userInfo.username}`}</span>
            </div>
            <div className="right-box">
              <h1>My Page</h1>
              <div className="input-field">
                <h3>내 정보</h3>
                <div className="userinfo-field">
                  <div>{`📩 ${userInfo.email}`}</div>
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
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

const LoginGlobalStyle = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
