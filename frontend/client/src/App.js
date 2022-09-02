import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styled from 'styled-components';
import axios from 'axios';

import Navbar from './Components/Navbar';
import LeftSidebar from './Components/LeftSidebar';

import LandingPage from './Pages/LandingPage';
import QuestionsPage from './Pages/QuestionsPage';
import AskQuestionPage from './Pages/AskQuestionPage';
import ReadQuestionPage from './Pages/ReadQuestionPage';
import SignUpPage from './Pages/SignUpPage';
import LogInPage from './Pages/LogInPage';
import NotFoundPage from './Pages/NotFoundPage';
import EditPage from './Pages/EditPage';
import MyPage from './Pages/MyPage';
import AnswerEditPage from './Pages/AnswerEditPage';

const url = `/question?page=1`;
const loginUrl = '/login';

axios.defaults.withCredentials = true;

function App() {
  const [data, setData] = useState([]);
  //JOIN
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  //GET Auth : Login and get token to CRUD
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loginToken, setLoginToken] = useState('');

  // const authHandler = () => { //check
  //   axios
  //     .get('https://localhost:4000/userinfo')
  //     .then((res) => {
  //       setIsLogin(true);
  //       setUserInfo(res.data);
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 401) {
  //         console.log(err.response.data);
  //       }
  //     });
  // };
  //login request
  const [loginInfo, setLoginInfo] = useState({ userId: '', password: '' });
  const [keepLogin, setKeepLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loginRQHandler = () => {
    const { userId, password } = loginInfo;
    if (!userId || !password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
      return;
    } else {
      setErrorMessage('');
    }
    return axios
      .post(loginUrl, { email, username, password })
      .then((res) => {
        localStorage.setItem('login-token', res.payload.Authorization);
        setLoginToken(localStorage.getItem('login-token'));
        setIsLogin(true);
        // Axios.defaults.headers.common['Authorization'] = `Bearer ${loginToken}`
      })
      .catch((err) => {
        if (err.response.data === 401) {
          setErrorMessage('로그인에 실패함');
        }
      });
  };

  const logoutHandler = () => {
    //로그아웃 구현-> client에서 처리 + 토큰 삭제
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

  //pagination
  const [limit, setLimit] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);

  //GET
  const getData = async () => {
    const getResponse = await axios(url);
    setData(getResponse.data);
    setTotalPosts(getResponse.data.totalElements);
  };

  useEffect(() => {
    const getAllPosts = async () => {
      const allPosts = await getData();
      if (allPosts) setData(allPosts);
    };
    getAllPosts();
  }, []);

  // {console.log(data.first)}

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLogin={isLogin} logoutHandler={logoutHandler} />

        <ComponentsWrapper>
          <LeftSidebar />

          <RoutesWrapper>
            <Routes>
              <Route
                path="/"
                element={<LandingPage isLogin={isLogin} />}
              ></Route>

              <Route
                path="/questionspage"
                element={
                  <QuestionsPage
                    isLogin={isLogin}
                    limit={limit}
                    totalPosts={totalPosts}
                  />
                }
              />

              <Route path="/askquestionpage" element={<AskQuestionPage />} />

              <Route
                path="/login"
                element={
                  <LogInPage
                    isLogin={isLogin}
                    loginRQHandler={loginRQHandler}
                    loginInfo={loginInfo}
                    setLoginInfo={setLoginInfo}
                    keepLogin={keepLogin}
                    setKeepLogin={setKeepLogin}
                    errorMessage={errorMessage}
                  />
                }
              />

              <Route
                path="/join"
                element={
                  <SignUpPage
                    username={username}
                    password={password}
                    email={email}
                    usernameHandler={usernameHandler}
                    emailHandler={emailHandler}
                    passwordHandler={passwordHandler}
                  />
                }
              />
              <Route
                path="/mypage"
                element={
                  <MyPage
                    userInfo={userInfo}
                    setIsLogin={setIsLogin}
                    setUserInfo={setUserInfo}
                    isLogin={isLogin}
                  />
                }
              />

              <Route
                path="/posts/:id"
                element={
                  <ReadQuestionPage
                    loginRQHandler={loginRQHandler}
                    isLogin={isLogin}
                  />
                }
              />

              <Route path="/answer/edit/:id" element={<AnswerEditPage />} />

              <Route path="/posts/:id" element={<NotFoundPage />} />

              <Route
                path="/posts/edit/:id"
                element={<EditPage data={data} />}
              />
            </Routes>
          </RoutesWrapper>
        </ComponentsWrapper>
      </div>
    </BrowserRouter>
  );
}

const ComponentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const RoutesWrapper = styled.div`
  width: 80%;
  height: 100vh;
  border-left: 1px solid rgba(229, 229, 229, 0.7);
  /* margin-left: calc( 15% + 5px) */
`;

export default App;
