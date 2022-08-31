import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AskQuestionForm = () => {
  const url = '/question?page=1'; //서버경로 수정
  const [author, setAuthor] = useState('author');
  const [createdAt, setCreatedAt] = useState(
    `${new Date().toLocaleDateString()}`
  );

  // const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const [vote, setVote] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [view, setView] = useState(0);

  // const setPreBody = (e) => {
  //   const bodyContent={<pre>e.target.value</pre>}
  //   setBody()
  // }

  const navigate = useNavigate();

  const postData = async (e) => {
    e.preventDefault();
    const post = { title, body, tags, author, createdAt, vote, answer, view };
    await axios
      .post(url, post)
      // .then(setData((prev) => [...prev, body]))
      .then(() => {
        navigate('/questionspage');
      });
  };

  return (
    <Test>
      <form>
        <div className="wrapper">
          <div className="main-first">Title</div>
          <div className="main">
            Be specific and imagine you are asking a question to another person
          </div>
          <input
            className="main"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. is there an R function for finding the index of an element in a vector?"
          />
        </div>

        <div className="wrapper">
          <div className="main-first">Body</div>
          <div className="main">
            Include all the information someone would need to answer your
            question
          </div>

          <textarea
            className="main"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <div className="wrapper">
          <div className="main-first">Tag</div>
          <div className="main">
            Add up to 5 tags to describe what your question in about
          </div>

          <input
            className="main"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. (iphone android sql)"
          />

          <div className="wrapper-button">
            <Button1 onClick={postData}>Review your question</Button1>
            <Button2>Discard draft</Button2>
          </div>
        </div>
      </form>
    </Test>
  );
};

export default AskQuestionForm;

const Test = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(241, 242, 243);
  width: 70%;
  height: 100vh;
  color: rgb(47, 47, 47);

  form {
    display: flex;
    flex-direction: column;
    width: 80%;
    background-color: white;
    margin-left: 13%;
    height: fit-content;
    box-shadow: 7px 8px 10px 0px gray;

    div.wrapper {
      background-color: white;
      .main {
        display: flex;
        text-align: left;
        justify-content: flex-start;
        margin: 10px;
        margin-left: 20px;
        &-first {
          display: flex;
          justify-content: flex-start;
          margin-left: 20px;
          margin-top: 25px;
          justify-content: flex-start;
          font-weight: bold;
        }
      }
    }

    button {
      display: flex;
      justify-content: flex-start;
      margin: 20px;
    }

    div.wrapper-button {
      display: flex;
    }

    input {
      flex: 1 auto !important;
      font-size: 13px;
      -webkit-appearance: none;
      width: 85%;
      margin: 0;
      padding: 0.6em 0.7em;
      border: 1px solid #bbc0c4;
      border-radius: 3px;
      background-color: #fff;
      color: #0c0d0e;
      line-height: 1.15384615;
      &::placeholder {
        opacity: 0.6;
      }
    }

    textarea {
      flex: 1 auto !important;
      font-size: 13px;
      -webkit-appearance: none;
      width: 85%;
      height: 250px;
      margin: 0;
      padding: 0.6em 0.7em;
      border: 1px solid #bbc0c4;
      border-radius: 3px;
      background-color: #fff;
      color: #0c0d0e;
      line-height: 1.15384615;
    }
  }
`;

const Button1 = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: rgb(67, 147, 247);
  width: 150px;
  border: none;
  height: 50px;
  border-radius: 2px;
  border: 1px solid skyblue;
  color: white;
  cursor: pointer;
`;

const Button2 = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: transparent;
  width: 23%;
  border: none;
  height: 40px;
  color: rgb(180, 59, 57);
  cursor: pointer;
`;
