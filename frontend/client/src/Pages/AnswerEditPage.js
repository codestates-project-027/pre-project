import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const AnswerEditPage = () => {
  const url = '/answer/';
  const { id } = useParams();
  const navigate = useNavigate();
  //   const prevAnswer = localStorage.getItem('answer');
  const [contents, setContents] = useState('');

  const updatePost = async (e) => {
    e.preventDefault();
    const updatePost = { contents };
    await axios
      .patch(url + id, updatePost) //서버경로 수정
      .then(() => {
        navigate(-1);
      });
  };


  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <EditGlobal>
        <div className="wrapper">
          <div className="title">Edit Answer</div>

          <div className="main--wrapper">
            <div className="main-first">Answer</div>
            <textarea
              className="main"
              type="text"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />

            <div className="wrapper-button">
              <Button1 onClick={updatePost}>save edits</Button1>
              <Button2 onClick={goBack}>cancel</Button2>
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

export default AnswerEditPage;

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
    justify-content: center;
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
  width: 110px;
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
  margin-left: 20px;
  background-color: transparent;
  width: 110px;
  border: none;
  height: 50px;
  border-radius: 2px;
  border: none;
  color: rgb(67, 147, 247);
  cursor: pointer;
  /* box-shadow : 5px 5px 10px 2px rgb(67, 147, 247); */
`;
