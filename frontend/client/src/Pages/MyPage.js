import styled from 'styled-components';
import PleaseLoginPage from './PleaseLoginPage';

export default function Mypage({ userInfo, isLogin, logoutHandler }) {
  localStorage.removeItem('title');
  localStorage.removeItem('body');
  localStorage.removeItem('edit-answer');
  localStorage.removeItem('tags-block');
  localStorage.removeItem('tags');
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
  .logout-btn {
    margin-top : 20px;
    cursor: pointer;
  }
`;
