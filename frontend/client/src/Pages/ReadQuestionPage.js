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
  BsClockHistory,
} from 'react-icons/bs';

const ReadQuestionPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [answerData, setAnswerData] = useState([]); //불러온 answer data

  // const [author, setAuthor] = useState('author');
  // const [createdAt, setCreatedAt] = useState(new Date().toLocaleDateString());
  // const [vote, setVote] = useState(0);
  // const [commentList, setCommentList]=useState(
  //   {
  //     "id":1,
  //     "commentContent":"comment",
  //     "author":"author",
  //     "createdAt":"date"
  //   })
  //   const [answerList ,setAnswerList]= useState([
  //     {answerContent:answerData, author, createdAt, vote, commentList}
  //   ])

  const { id } = useParams();

  const getData = async () => {
    const getResponse = await axios('http://localhost:8080/posts/' + id);
    setData(getResponse.data);
    setAnswerData(getResponse.data.answerList);
    // setCommentData(getResponse.data.commentList);
  };

  const deleteData = async () => {
    await axios.delete(`http://localhost:8080/posts/${id}`).then(() => {
      navigate('/questionspage');
    });
  };

  //answer
  const postAnswer = async (e) => {
    e.preventDefault();
    window.location.reload();
  };
  // const postAnswer = async (e) => {
  //   e.preventDefault();
  //   const answer = { "answerList": {answerContent, author:'author', createdAt : new Date().toLocaleDateString(), vote:0} };
  //   await axios.post(`http://localhost:8080/posts/${id}`, answer);
  //   window.location.reload();
  // };

  // const postAnswer = async (e) => {
  //   e.preventDefault();
  //   const answer = { title };
  //   await axios.post(`http://localhost:8080/posts/${id}`, answer);
  //   window.location.reload();
  // };

  // const postAnswer = async (e) => {
  //   e.preventDefault();
  //   // const answer = {"answerList":{"answerContent":answerData }};
  //   // 유효
  //   //const post = { title, body, tags, author, createdAt, vote, answer, view};
  //   const answer = {answerList};
  //   await axios.post(`http://localhost:8080/posts/${id}`, answer);
  //   window.location.reload();
  // }

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
                <p className="date--and--answer">{data.view} times</p>
                <p className="date--and--ask" style={{ marginLeft: '20px' }}>
                  Author
                </p>
                <p className="date--and--answer">{data.author}</p>
              </div>
            </div>

            <Link to="/askquestionpage">
              <AskButton>Ask Question</AskButton>
            </Link>
          </div>

          <div className="content--wrapper">
            <div className="icons">
              <BsFillCaretUpFill size="27" className="bs click" />
              <p className="bs">{data.vote}</p>
              <BsFillCaretDownFill size="27" className="bs click" />
              <BsFillBookmarkStarFill size="15" className="bs add click" />
              <BsClockHistory size="15" className="bs add click" />
            </div>
            <div className="content--comment--answer">
              <pre className="content">{data.body}</pre>
              <div className="tags--edit--delete">
                <div className="tags">{data.tags}</div>
                <div className="edit--delete">
                  <div className="edit">
                    {localStorage.setItem('title', data.title)}
                    {localStorage.setItem('body', data.body)}
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
                  <AnswerCard />
                </div>

                <div className="wirte--answer--desc">Your Answer</div>

                <textarea
                  type="text"
                  onChange={(e) => setAnswerData(e.target.value)}
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
      display: -webkit-box;
      -webkit-box-orient: vertical;
      white-space: pre-wrap;
      line-height: 1.8;
      word-break: break-all;
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
