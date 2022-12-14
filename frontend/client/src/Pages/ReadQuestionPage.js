import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AskButton from '../Components/AskButton';
import AnswerCard from '../Components/AnswerCard';
import OverflowBlog from '../assets/overflowblog.png';
import {
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsFillBookmarkStarFill,
} from 'react-icons/bs';
import { TiCancel } from 'react-icons/ti';
import TagBlank from '../Components/TagBlank';

const ReadQuestionPage = ({
  jwtToken,
  isLogin,
  userName,
  setUserName,
  setIsLogin,
}) => {
  const url = '/question/'; //서버경로 수정
  const voteUrl = '/vote/question';
  const postAnswerUrl = '/answer';
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [answerData, setAnswerData] = useState([]); //불러온 answer data
  const [commentData, setCommentData] = useState([]);
  const [questionId, setQuestionId] = useState(id);
  const [answerContents, setAnswerContents] = useState('');
  const [votedUp, setVotedUp] = useState(false);
  const [votedDown, setVotedDown] = useState(false);
  const [voteCanceled, setVoteCanceled] = useState(false);

  const headers = { headers: { Authorization: `Bearer ${jwtToken}` } };

  //TagBlock handler

  //Question
  const getData = async () => {
    const getResponse = await axios(url + id);
    setData(getResponse.data);
    setAnswerData(getResponse.data.answerList);
    setCommentData(answerData.commentList);
    setUserName(localStorage.getItem('user-name'));
  };

  const deleteData = async () => {
    try {
      await axios.delete(url + id, headers).then(() => {
        navigate('/questionspage');
        window.location.reload();
      });
    } catch (err) {
      if (err.response) {
        alert(`만료된 토큰입니다. 다시 로그인해주세요`);
        setIsLogin(false);
        navigate('/login');
      }
    }
  };

  //Answer
  const postAnswer = async (e) => {
    if (answerContents === '') {
      alert(`내용을 입력하세요`);
      return;
    }
    e.preventDefault();
    const answer = {
      questionId,
      contents: answerContents,
      userName: localStorage.getItem('user-name'),
    };
    try {
      await axios.post(postAnswerUrl, answer, headers);
      window.location.reload();
    } catch (err) {
      if (err.response) {
        alert(`만료된 토큰입니다. 다시 로그인해주세요`);
        setIsLogin(false);
        navigate('/login');
      }
    }
  };
  //votes
  const voteUp = async () => {
    try {
      const up = {
        questionId: id,
        userName: localStorage.getItem('user-name'),
        vote: true,
      };
      await axios.post(voteUrl, up, headers);
      setVotedUp(true);
      setVotedDown(false);
      setVoteCanceled(false);
      window.location.reload();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          alert(`Already liked`);
        } else {
          alert(`만료된 토큰입니다. 다시 로그인해주세요`);
          setIsLogin(false);
          navigate('/login');
        }
      }
    }
  };

  const voteDown = async () => {
    try {
      const down = {
        questionId: id,
        userName: localStorage.getItem('user-name'),
        vote: false,
      };
      await axios.post(voteUrl, down, headers).then((res) => console.log(res));
      setVotedDown(true);
      setVotedUp(false);
      setVoteCanceled(false);
      window.location.reload();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          alert(`Already disliked`);
        } else {
          alert(`만료된 토큰입니다. 다시 로그인해주세요`);
          setIsLogin(false);
          navigate('/login');
        }
      }
    }
  };

  const voteCancel = async () => {
    const cancelUrl = `/vote/question/${id}/${userName}`;
    try {
      await axios.delete(cancelUrl, headers).then((res) => console.log(res));
      setVoteCanceled(true);
      setVotedUp(false);
      setVotedDown(false);
      window.location.reload();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          alert(`Already canceled`);
        } else if (err.response === 403) {
          alert(`만료된 토큰입니다. 다시 로그인해주세요`);
          setIsLogin(false);
          navigate('/login');
        } else {
          if (err.response) {
            alert(err);
          }
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Div>
        <div className="question--wrapper">
          <div className="title--ask--date--wrapper">
            <div className="title--date--wrapper">
              <div className="title">{data.title}</div>
              <div style={{ display: 'flex' }}>
                <p className="date--and--ask">Asked</p>
                <p className="date--and--answer">{data.createdAt}</p>
                <p className="date--and--ask" style={{ marginLeft: '20px' }}>
                  Viewed
                </p>
                <p className="date--and--answer">{data.views} times</p>
                <p className="date--and--ask" style={{ marginLeft: '20px' }}>
                  Author
                </p>
                <p className="date--and--answer">{data.userName}</p>
              </div>
            </div>
            {isLogin ? (
              <Link to="/askquestionpage">
                <AskButton>Ask Question</AskButton>
              </Link>
            ) : null}
          </div>

          <div className="content--wrapper">
            <div className="icons">
              <BsFillCaretUpFill
                onClick={voteUp}
                size="27"
                className="bs click"
              />
              {/* <VoteBoxUp>like</VoteBoxUp> */}
              <p className="bs">{data.votes}</p>
              <BsFillCaretDownFill
                onClick={voteDown}
                size="27"
                className="bs click"
              />
              {/* <VoteBoxDown>dislike</VoteBoxDown> */}
              <TiCancel size="20" className="bs click" onClick={voteCancel} />
              {/* <VoteBoxReset>reset</VoteBoxReset> */}
              <BsFillBookmarkStarFill size="15" className="bs add click" />
              {/* <VoteBoxBookmark>bookmark</VoteBoxBookmark> */}
              {/* <BsClockHistory size="15" className="bs add click" /> */}
            </div>
            <div className="content--comment--answer">
              <pre className="content">{data.contents}</pre>
              <div className="tags--edit--delete">
                <div className="tags">
                  {localStorage.setItem('tags-block', data.tags)}
                  <TagBlank tags={localStorage.getItem('tags-block')} />
                </div>

                <div className="edit--delete">
                  <div className="edit">
                    {localStorage.setItem('title', data.title)}
                    {localStorage.setItem('body', data.contents)}
                    {localStorage.setItem('tags', data.tags)}
                    {data.userName === localStorage.getItem('user-name') ? (
                      <Link to={`/posts/edit/${id}`} style={LinkStyle}>
                        Edit
                      </Link>
                    ) : null}
                  </div>
                  {data.userName === localStorage.getItem('user-name') ? (
                    <div className="delete" onClick={deleteData}>
                      Delete
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="answer--wrapper">
                <div className="read--answer--wrapper">
                  <div className="read--answer--desc">
                    {answerData ? answerData.length : null}&nbsp;Answers
                  </div>
                  <AnswerCard
                    answerData={answerData}
                    jwtToken={jwtToken}
                    headers={headers}
                    userName={userName}
                    setUserName={setUserName}
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                  />
                </div>

                <div className="wirte--answer--desc">Your Answer</div>

                <textarea
                  type="text"
                  className="post--answer"
                  onChange={(e) => setAnswerContents(e.target.value)}
                />
              </div>

              <AskButton style={AskStyle} onClick={postAnswer}>
                {' '}
                Post your Answer{' '}
              </AskButton>
            </div>

            <div className="sub--wrapper">
              <img className="overflowblog" alt="blogs" src={OverflowBlog} />
            </div>
          </div>
        </div>
      </Div>
    </>
  );
};

export default ReadQuestionPage;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  .question--wrapper {
    display: flex;
    flex-direction: column;
    width: 95%;
  }
  .title--ask--date--wrapper {
    display: flex;
    margin: 30px;
    margin-right: 0px;
    margin-top: 30px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(229, 229, 229, 0.7);
  }
  .title--date--wrapper {
    display: flex;
    flex-direction: column;
  }
  .title {
    font-size: 23px;
    margin-bottom: 10px;
  }
  .date--and--ask {
    color: rgb(108, 115, 123);
  }
  .date--and--answer {
    margin-left: 5px;
  }
  .content--wrapper {
    display: flex;
  }
  .icons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 30px;
    width: 55px;
    color: rgb(187, 191, 195);
  }
  p.bs {
    color: rgb(67, 67, 71);
    cursor: pointer;
  }
  .bs {
    margin: 0px;
    margin-top: 10px;
    &.add {
      margin-top: 15px;
    }
    &.click {
      cursor: pointer;
    }
  }

  .content--comment--answer {
    display: flex;
    flex-direction: column;
    width: 750px;
    height: fit-content;
    margin-left: 20px;

    pre.content {
      width: 720px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      white-space: pre-wrap;
      line-height: 1.8;
      word-wrap: break-word;
      font-family: Arial, Helvetica, sans-serif;
    }
  }

  .tags--edit--delete {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
  .tags {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .edit--delete {
    display: flex;
    margin-top: 30px;
  }
  .edit {
    color: rgb(108, 115, 123);
  }
  .delete {
    color: rgb(108, 115, 123);
    margin-left: 10px;
    cursor: pointer;
  }
  .answer--wrapper {
    display: flex;
    flex-direction: column;
    .post--answer {
      :focus {
        outline: transparent;
        &:focus-within {
          border: 1px solid rgb(140, 186, 229);
          box-shadow: 5px 5px 5px rgb(218, 232, 241);
        }
      }
    }
  }
  .read--answer--wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
  .read--answer--desc {
    display: flex;
  }

  .wirte--answer--desc {
    display: flex;
    text-align: left;
    justify-content: flex-start;
    margin-top: 30px;
    font-weight: 600;
  }
  textarea {
    margin-top: 15px;
    font-size: 13px;
    width: 95%;
    height: 200px;
    padding: 0.6em 0.7em;
    border: 1px solid #bbc0c4;
    border-radius: 3px;
    outline: transparent;
    &:focus-within {
      border: 1px solid rgb(74, 148, 247);
    }
  }

  img.overflowblog {
    margin-left: 20px;
    width: 280px;
  }
`;

const LinkStyle = {
  color: 'rgb(108,115,123)',
  marginLeft: '2px',
  cursor: 'pointer',
  textDecoration: 'none',
};
const AskStyle = {
  marginTop: '15px',
  marginLeft: '0px',
  width: '170px',
  borderRadius: '4px',
  height: '45px',
  marginBottom: '50px',
};

// const VoteBoxUp = styled.p`
//   display: block;
//   text-align: center;
//   position: absolute;
//   width: 35px;
//   padding: 2px;
//   margin-left: 45px;  margin-top: 20px;
//   -webkit-border-radius: 8px;
//   -moz-border-radius: 8px;
//   background: rgba(100,163,166,0.5);  color: #fff;
//   &:hover{
//     display:none;
//   }
// `

// const VoteBoxDown = styled(VoteBoxUp)`
// width: 55px;
// margin-left: 65px;  margin-top: 85px;
// &:hover{
//   display:block;
// }
// `

// const VoteBoxReset = styled(VoteBoxUp)`
// margin-left: 55px;
// width: 45px;
// margin-top: 120px;
// &:hover{
//   display:block;
// }
// `
// const VoteBoxBookmark = styled(VoteBoxDown)`
// width: 90px;
// margin-left: 100px;
// margin-top: 155px;
// &:hover{
//   display:block;
// }
// `
