import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiTwotoneTrophy, AiFillTags } from 'react-icons/ai';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { MdThumbsUpDown } from 'react-icons/md';
import axios from 'axios';

const SignUpPage = ({
  username,
  password,
  email,
  usernameHandler,
  emailHandler,
  passwordHandler,
  mockBaseUrl
}) => {
  localStorage.removeItem('title');
  localStorage.removeItem('body');
  localStorage.removeItem('edit-answer');
  localStorage.removeItem('tags-block');
  localStorage.removeItem('tags');

  const url = '/join'; //서버경로 수정
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [checked, setChecked] = useState(false);

  const regex =
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const submitHandler = async (e) => {
    e.preventDefault();
    setClick(true);
    const joinInfo = { username, email, password };
    if (
      username !== '' &&
      password !== '' &&
      email !== '' &&
      password.length >= 8 &&
      username.length >= 8 &&
      regex.test(email) === true
    ) {
      await axios
        .post(mockBaseUrl+url, joinInfo)
        .then(() => alert('환영합니다!'))
        .then(() => navigate('/questionspage'))
        .catch((err) => alert('이미 가입한 회원정보입니다.'));
    } else if (regex.test(email) === false || email.length === 0) {
      alert('이메일을 다시 입력해주세요');
    } else if (regex.test(email) === true && username.length < 8) {
      alert('이름은 8자리 이상이여야 합니다');
    } else {
      alert('비밀번호는 8자리 이상이여야 합니다');
    }
  };

  const checkHandler = (e) => {
    if (e.target.checked) {
      setChecked(true);
    } else setChecked(false);
  };
  return (
    <SignUpCSS>
      <div className="signup-description">
        <h1>Join the Stack Overflow community</h1>
        <div>
          <RiQuestionnaireFill
            className="signup-description-button"
            size="18px"
            color="rgb(19, 127, 254)"
          />
          <span> Get unstuck -- ask a question</span>
        </div>
        <div>
          <MdThumbsUpDown
            className="signup-description-button"
            size="18px"
            color="rgb(19, 127, 254)"
          />
          <span> Unlock new privileges like voting and commenting</span>
        </div>
        <div>
          <AiFillTags
            className="signup-description-button"
            size="18px"
            color="rgb(19, 127, 254)"
          />
          <span> Save your favorite tags, filters, and jobs</span>
        </div>
        <div>
          <AiTwotoneTrophy
            className="signup-description-button"
            size="18px"
            color="rgb(19, 127, 254)"
          />
          <span> Earn reputation and badges</span>
        </div>
      </div>

      <div className="signup-info">
        <div className="signup-input">
          <form>
            <div>
              <h2>Display name</h2>
              <input required onChange={usernameHandler} />
              {click && username.length >= 8 ? (
                <span className="signup-confirm">
                  사용할 수 있는 아이디입니다.
                </span>
              ) : undefined}
            </div>
            <div>
              <h2>Email</h2>
              <input required onChange={emailHandler} />
              {click && regex.test(email) === false ? (
                <span className="signup-error">
                  유효한 이메일 주소가 아닙니다.
                </span>
              ) : undefined}
            </div>
            <div>
              <h2>Password</h2>
              <input required onChange={passwordHandler} type="password" />
              {click && password.length >= 8 ? (
                <span className="signup-confirm">
                  사용할 수 있는 비밀번호입니다
                </span>
              ) : undefined}
            </div>
            <div className="signup-submit">
              <div>
                <input
                  type="checkbox"
                  onChange={checkHandler}
                  className="opt--description"
                />
                Opt-in to receive occasional product updates, user research
                invitations, company announcements, and digests.
                {/* {click && checked === false ? ( <div className="signup-error">필수 체크항목입니다.</div> ) : null} */}
              </div>
              <div>
                <button onClick={submitHandler}>Sign up</button>
              </div>
            </div>
            <div className="signup-check">
              <div>
                Already have an account?
                <Link style={{ color: 'rgb(49,114,198)' }} to="/login">
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </SignUpCSS>
  );
};

export default SignUpPage;

const SignUpCSS = styled.div`
  background-color: rgb(237, 239, 240);
  display: flex;
  padding: 24px;
  height: 100vh;
  h1 {
    font-size: 15px;
  }
  .signup-description {
    margin-left: 10%;
    margin-top: 150px;
    width: 40%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px 10px 50px 50px;
    div {
      font-size: 11px;
      padding: 0;
    }
  }
  .signup-info {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 500px;
    margin-top: 100px;
    padding: 20px;
    border-radius: 2%;
    background-color: white;
    box-shadow: 2px 2px 2px lightgray;
  }
  .signup-input {
    input {
      width: 100%;
      border-radius: 4%;
      border: 1px solid lightgray;
      height: 20px;
    }
    h2 {
      font-size: 12px;
    }
    form {
      justify-content: space-between;
    }

    .signup-error {
      color: red;
      font-size: 10px;
    }

    .signup-confirm {
      color: rgb(19, 127, 254);
      font-size: 10px;
    }
  }
  .signup-description-button {
    position: relative;
    top: 6px;
    size: 10px;
  }
  .signup-submit {
    padding: 20px 0px;
    font-size: 10px;
    input {
      width: 15px;
      cursor: pointer;
      font-size: 1px;
      position: relative;
      top: 7px;
      margin: 7px;
      .opt--description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.8;
        word-wrap: break-word;
      }
    }
    button {
      background-color: rgb(19, 127, 254);
      width: 100%;
      border-radius: 4%;
      border: none;
      box-shadow: 1px 1px 1px rgb(68, 151, 255);
      color: white;
      padding: 5px;
      margin-top: 20px;
    }
  }
  .signup-check {
    display: flex;
    margin-top: 20px;
    font-size: 10px;
  }
`;
