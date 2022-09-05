import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const EditPage = ({ jwtToken, userInfo, getValidToken, setIsLogin }) => {
  const url = '/question/';
  const { id } = useParams();
  const navigate = useNavigate();
  const prevTitle = localStorage.getItem('title');
  const prevBody = localStorage.getItem('body');
  const prevTags = localStorage.getItem('tags');
  const [title, setTitle] = useState(prevTitle);
  const [contents, setContents] = useState(prevBody);
  const [tags, setTags] = useState(prevTags);

  const updatePost = async (e) => {
    if (title === '' || contents === '' || tags === '') {
      alert(`내용을 입력하세요`);
      return;
    }
    try {
      const headers = { headers: { Authorization: `Bearer ${jwtToken}` } };
      e.preventDefault();
      const updatePost = {
        title,
        contents,
        tags: [JSON.parse(JSON.stringify(tags))],
      };
      await axios.patch(url + id, updatePost, headers).then(() => {
        navigate('/questionspage');
      });
    } catch (err) {
      if (err.response) {
        alert(`만료된 토큰입니다. 다시 로그인해주세요`);
        setIsLogin(false);
        navigate('/login');
      }
    }
  };

  const discardDraft = () => {
    setTitle('');
    setContents('');
    setTags('');
  };

  return (
    <>
      <EditGlobal>
        <div className="wrapper">
          <div className="title">Edit question</div>

          <div className="main--wrapper">
            <div className="main-first">Title</div>
            <input
              className="main"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="main-first">Body</div>
            <textarea
              className="main"
              type="text"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />

            <div className="main-first">Tag</div>
            <input
              className="main"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. (iphone android sql)"
            />

            <div className="wrapper-button">
              <Button1 onClick={updatePost}>Review your question</Button1>
              <Button2 onClick={discardDraft}>Discard draft</Button2>
            </div>
          </div>
        </div>

        <div className="tips--wrapper">
          <div>tips</div>
        </div>
      </EditGlobal>
    </>
  );
};

export default EditPage;

const EditGlobal = styled.div`
  display: flex;

  .wrapper {
    display: flex;
    flex-direction: column;
    width: 75%;
    .title {
      width: fit-content;
      margin-left: 80px;
      margin-top: 30px;
      margin-bottom: 30px;
      font-size: 25px;
      font-weight: 600;
      text-align: left;
    }
  }
  .tips--wrapper {
    display: flex;
    font-size: 30px;
    width: 25%;
    height: 500px;
    background-color: aliceblue;
    flex-direction: column;
  }
  .main--wrapper {
    display: flex;
    flex-direction: column;
    .main {
      display: flex;
      text-align: left;
      justify-content: flex-start;
      margin: 10px;
      margin-left: 80px;
      &-first {
        display: flex;
        justify-content: flex-start;
        margin-left: 80px;
        margin-top: 25px;
        justify-content: flex-start;
        font-weight: bold;
      }
    }
  }

  button {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
  }

  div.wrapper-button {
    display: flex;
  }

  input {
    flex: 1 auto !important;
    font-size: 13px;
    -webkit-appearance: none;
    width: 75%;
    margin: 0;
    padding: 0.6em 0.7em;
    border: 1px solid #bbc0c4;
    border-radius: 3px;
    background-color: #fff;
    color: #0c0d0e;
    line-height: 1.15384615;
  }

  textarea {
    flex: 1 auto !important;
    font-size: 13px;
    -webkit-appearance: none;
    width: 75%;
    height: 250px;
    margin: 0;
    padding: 0.6em 0.7em;
    border: 1px solid #bbc0c4;
    border-radius: 3px;
    background-color: #fff;
    color: #0c0d0e;
    line-height: 1.15384615;
  }
`;
const Button1 = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  margin-left: 80px;
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
  margin-left: 30px;
  align-items: center;
  text-align: center;
  background-color: transparent;
  width: 23%;
  border: none;
  height: 40px;
  color: rgb(180, 59, 57);
  cursor: pointer;
`;
