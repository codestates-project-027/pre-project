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

const ReadQuestionPage = () => {
  const url = '/question/'; //서버경로 수정
  const voteUrl = '/vote/question';
  const postAnswerUrl = '/answer';
  const deleteAnswerUrl = '/answer/';
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [answerData, setAnswerData] = useState([]); //불러온 answer data
  const [commentData, setCommentData] = useState([]);
  const [questionId, setQuestionId] = useState(id);
  const [answerContents, setAnswerContents] = useState('');
  const [userName, setUserName] = useState('userName');

  //Question
  const getData = async () => {
    const getResponse = await axios(url + id);
    setData(getResponse.data);
    setAnswerData(getResponse.data.answerList);
    setCommentData(answerData.commentList);
  };

  const deleteData = async () => {
    await axios.delete(url + id).then(() => {
      navigate(-1);
    });
  };

  //Answer
  const postAnswer = async (e) => {
    e.preventDefault();
    const answer = { questionId, contents: answerContents, userName };
    await axios.post(postAnswerUrl, answer);
    window.location.reload();
  };

  //votes
  const voteUp = async () => {
    const up = { questionId: id, member: userName, vote: true };
    await axios.post(voteUrl, up);
    window.location.reload();
  };

  const voteDown = async () => {
    const down = { questionId: id, member: userName, vote: false };
    await axios.post(voteUrl, down);
    window.location.reload();
  };

  const voteDelete = async () => {
    const voteReset = { questionId: id, member: userName };
    await axios.delete(voteUrl, { data: voteReset });
    window.location.reload();
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

            <Link to="/askquestionpage">
              <AskButton>Ask Question</AskButton>
            </Link>
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
              <TiCancel size="20" className="bs click" onClick={voteDelete} />
              {/* <VoteBoxReset>reset</VoteBoxReset> */}
              <BsFillBookmarkStarFill size="15" className="bs add click" />
              {/* <VoteBoxBookmark>bookmark</VoteBoxBookmark> */}
              {/* <BsClockHistory size="15" className="bs add click" /> */}
            </div>
            <div className="content--comment--answer">
              <pre className="content">{data.contents}</pre>
              <div className="tags--edit--delete">
                <div className="tags">{data.tags}</div>
                <div className="edit--delete">
                  <div className="edit">
                    {localStorage.setItem('title', data.title)}
                    {localStorage.setItem('body', data.contents)}
                    {localStorage.setItem('tags', data.tags)}
                    <Link to={`/posts/edit/${id}`} style={LinkStyle}>
                      Edit
                    </Link>
                  </div>
                  <div className="delete" onClick={deleteData}>
                    Delete
                  </div>
                </div>
              </div>

              <div className="answer--wrapper">
                <div className="read--answer--wrapper">
                  <div className="read--answer--desc">
                    {answerData ? answerData.length : null}&nbsp;Answers
                  </div>
                  <AnswerCard answerData={answerData} />
                </div>

                <div className="wirte--answer--desc">Your Answer</div>

                <textarea
                  type="text"
                  onChange={(e) => setAnswerContents(e.target.value)}
                />
              </div>

              <AskButton style={AskStyle} onClick={postAnswer}>
                {' '}
                Post your Answer{' '}
              </AskButton>
              {/* <button onClick={console.log(data.JSON.stringify(answerList))}>answer list</button> */}
              {/* <button onClick={console.log(data.commentList)}>comment list</button> */}
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
    width: fit-content;
    background-color: rgb(227, 236, 243);
    color: rgb(72, 114, 153);
    border-radius: 5px;
    padding: 4px;
    padding-left: 7px;
    padding-right: 7px;
    cursor: pointer;
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
