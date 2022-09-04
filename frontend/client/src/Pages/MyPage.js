import styled from 'styled-components';
import PleaseLoginPage from './PleaseLoginPage';

export default function Mypage({ userInfo, isLogin, logoutHandler }) {

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
                  <div>{`✉️ ${userInfo.email}`}</div>
                </div>
                <button className="logout-btn" onClick={logoutHandler}>
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        </LoginGlobalStyle>
      ) : (
        <PleaseLoginPage />
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
