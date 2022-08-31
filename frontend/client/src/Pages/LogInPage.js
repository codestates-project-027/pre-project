import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/LogoGlyphMd.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogInPage = ({setUserInfo, setIsLogin}) => {
  const [loginInfo, setLoginInfo] = useState({ userId: '', password: ''});
  const [checkedKeepLogin, setCheckedKeepLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputValue = (key) => (e)=> {
    setLoginInfo({...loginInfo, [key]: e.target.value});
  }

  const loginRQHandler = () => {
    const { userId, password} = loginInfo;
    if (!userId || !password){ setErrorMessage('아이디와 비밀번호를 입력하세요'); return;}
    else { setErrorMessage('')};
    return axios.post('https://localhost:4000/login',{loginInfo, checkedKeepLogin})
    .then(res=>{
      setIsLogin(true); setUserInfo(res.data);
      localStorage.setItem('login-token',res.token)
    }).then(()=> navigate('/'))
    .catch(err=>{
      if (err.response.data === 401){setErrorMessage('로그인에 실패함')}
    })
  }

  return (
    <>
    <LoginGlobalStyle>
      <Logo style={{marginTop:'-80px'}}/>
    <div className="login--page--wrapper">
      <div className="button--wrapper">
        <Button style={GoogleColor}>Log in with Google</Button>
        <Button style={GithubColor} onClick>Log in with GitHub</Button>
        <Button style={FBColor}>Log in with Facebook</Button>
      </div>

      <div className="loginform--wrapper">
        <div className="login--components--wrapper">
          <div className="label--input--button--wrapper">
            <label for="email">Email</label>
            <input name="email" type="email" onChange={handleInputValue('userId')}/>

            <label for="password">Password</label>
            <input name="password" type="password" onChange={handleInputValue('password')} />

            <label className='checkbox-container'>
              <input type='checkbox' checked onChange={() => setCheckedKeepLogin(!checkedKeepLogin)} />
              {' 로그인 상태 유지하기'}
            </label>

            <button onClick={loginRQHandler}>Log in</button>
            {errorMessage ? (
            <div id='alert-message' data-testid='alert-message'>
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
    </>
  );
};

export default LogInPage;

const LoginGlobalStyle = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
background-color: rgb(241,242,243);
.login--page--wrapper{
  margin-top: 40px;
}
.loginform--wrapper{
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 330px;
  background-color:white;
  border-radius: 3px;
}
.login--components--wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15%;
  width: 200px;
  label{
    font-weight: bold;
  }
  input{
    margin-top: 10px;
    margin-bottom: 20px;
  }
  button{
    margin-top: 5px;
    height: 35px;
    width: 200px;
    background-color: rgb(67,147,247);
    border : none;
    color: white;
    font-weight: bold;
  }
  .label--input--button--wrapper{
    margin-top: 40px;
  }
}
`

const Button = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 300px;
height: 40px;
border-radius: 3px;
margin-bottom: 10px;
`
const GoogleColor = {
  backgroundColor:'white', 
  color:'rgb(60,64,68)',
  border:'1px solid rgb(235,236,237)'
}

const GithubColor = {
  backgroundColor:'rgb(48,51,55)', 
  color:'white',
  cursor: 'pointer'
}

const FBColor = {
  backgroundColor:'rgb(62,83,148)', 
  color:'white'
}