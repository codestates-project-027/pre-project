import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styled from 'styled-components';
import axios from 'axios';
import Navbar from './Components/Navbar';
import LeftSidebar from './Components/LeftSidebar';

import LandingPage from './Pages/LandingPage';
import QuestionsPage from './Pages/QuestionsPage';
import TagsPage from './Pages/TagsPage';
import AskQuestionPage from './Pages/AskQuestionPage';
import ReadQuestionPage from './Pages/ReadQuestionPage';
import SignUpPage from './Pages/SignUpPage';
import LogInPage from './Pages/LogInPage';
import NotFoundPage from './Pages/NotFoundPage';
import EditPage from './Pages/EditPage';
import MyPage from './Pages/MyPage';
import AnswerEditPage from './Pages/AnswerEditPage';

axios.defaults.withCredentials = true;

function App() {
  const url = `/question?page=1`;
  const loginUrl = '/login';

  const [data, setData] = useState([]);

  //JOIN
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [totalPages, setTotalPages] = useState(1);

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
  const [jwtToken, setJwtToken] = useState('');
  const [userName, setUserName] = useState('new comer');

  //Auth: Login
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [keepLogin, setKeepLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
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

  const loginRQHandler = async () => {
    const { email, password } = loginInfo;
    if (!email || !password) {
      setErrorMessage('???????????? ??????????????? ???????????????');
      return;
    } else {
      setErrorMessage('');
    }
    try {
      await axios.post(loginUrl, { email, password }).then((res) => {
        localStorage.setItem('login-token', res.headers.authorization);
        const token = localStorage.getItem('login-token');
        const resolved = parseJwt(token);
        setJwtToken(token);
        setUserInfo({ email: resolved.email, username: resolved.username });
        localStorage.setItem('user-name', userInfo.username);
        if (userInfo) {
          setUserName(JSON.parse(JSON.stringify(userInfo.username)));
        }
        setIsLogin(true);
      });
    } catch (err) {
      if (err.response) {
        alert(`???????????? ?????? ?????????????????????.`);
      }
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('login-token');
    localStorage.removeItem('user-name');
    setUserInfo(null);
    setIsLogin(false);
  };

  //pagination
  const [limit, setLimit] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);

  //GET
  const getData = async () => {
    localStorage.getItem('login-token');
    if (localStorage.getItem('login-token')) {
      const token = localStorage.getItem('login-token');
      const resolved = parseJwt(token);
      setJwtToken(token);
      setUserInfo({ email: resolved.email, username: resolved.username });
      if (userInfo) {
        setUserName(JSON.parse(JSON.stringify(userInfo.username)));
        localStorage.setItem('user-name', userName);
      }
      setIsLogin(true);
    }
    if (!localStorage.getItem('login-token')) {
      setIsLogin(false);
    }

    const getResponse = await axios(url);
    setData(getResponse.data);
    setTotalPosts(getResponse.data.totalElements);
    setTotalPages(getResponse.data.totalPages);
  };

  //GET Tag Pages
  const [tagChecked, setTagChecked] = useState('');

  useEffect(() => {
    getData();
  }, []);

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
                    setTagChecked={setTagChecked}
                  />
                }
              />

              <Route
                path="/tagspage"
                element={
                  <TagsPage
                    isLogin={isLogin}
                    limit={limit}
                    totalPosts={totalPosts}
                    tagChecked={tagChecked}
                  />
                }
              />

              <Route
                path="/askquestionpage"
                element={
                  <AskQuestionPage
                    jwtToken={jwtToken}
                    userInfo={userInfo}
                    setIsLogin={setIsLogin}
                  />
                }
              />

              <Route
                path="/login"
                element={
                  <LogInPage
                    isLogin={isLogin}
                    loginRQHandler={loginRQHandler}
                    setLoginInfo={setLoginInfo}
                    loginInfo={loginInfo}
                    setKeepLogin={setKeepLogin}
                    keepLogin={keepLogin}
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
                    isLogin={isLogin}
                    logoutHandler={logoutHandler}
                  />
                }
              />

              <Route
                path="/posts/:id"
                element={
                  <ReadQuestionPage
                    jwtToken={jwtToken}
                    isLogin={isLogin}
                    userName={userName}
                    setUserName={setUserName}
                    setIsLogin={setIsLogin}
                  />
                }
              />

              <Route
                path="/answer/edit/:id"
                element={
                  <AnswerEditPage jwtToken={jwtToken} setIsLogin={setIsLogin} />
                }
              />

              <Route path="/posts/:id" element={<NotFoundPage />} />

              <Route
                path="/posts/edit/:id"
                element={
                  <EditPage jwtToken={jwtToken} setIsLogin={setIsLogin} />
                }
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
