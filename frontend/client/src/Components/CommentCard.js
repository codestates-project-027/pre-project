import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsFillBookmarkStarFill,
  BsClockHistory,
} from 'react-icons/bs';

const CommentCard = () => {
  const [answerData, setAnswerData] = useState([]);
  const { id } = useParams();

  const getData = async () => {
    //answerData = 가져온 answer data [{}]
    const getResponse = await axios('http://localhost:8080/posts/' + id);
    setAnswerData(getResponse.data.answerList); //JSON.stringify(answerData) = [{},{},{},{}]
    // console.log(JSON.stringify(answerData));
  };

  useEffect(() => {
    getData();
  }, []);

  return <>this is comment</>;
};

const AnswerCardDefault = styled.div`
  .answers--wrapper {
    display: flex;
    flex-direction: column;
  }
  .answers--icon--content {
    display: flex;
    margin-top: 20px;
  }
  .answers--icons {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(187, 191, 195);
    flex-direction: column;
    /* width: 5%; */
    /* background-color: aliceblue; */
  }
  .answers--content {
    width: 90%;
    margin-left: 10px;
    padding: 10px;
  }
  .answers--edit--delete--author {
    display: flex;
    flex-direction: column;
    align-items: center;

    .one {
      width: 700px;
      display: flex;
      justify-content: space-between;
    }
    .two {
      display: flex;
      align-items: center;
      width: 700px;
      justify-content: right;
    }
    .answers--edit--delete {
      display: flex;
      align-items: center;
    }
    .edit {
      margin-left: 23px;
      color: rgb(183, 186, 190);
    }
    .delete {
      cursor: default;
      color: rgb(183, 186, 190);
    }
  }
  .author--date {
    display: flex;
    flex-direction: column;
    background-color: rgb(229, 236, 242);
    color: cadetblue;
    padding: 5px;
    text-align: right;
    border-radius: 3px;
  }
  .answers--content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.5;
    word-wrap: break-word;
  }
  .comment--wrapper {
    display: flex;
    width: 100%;
    justify-content: left;
  }
  .comment--button {
    width: 150px;
    color: rgb(182, 186, 191);
    font-weight: bold;
    &:hover {
      color: rgb(107, 135, 166);
      cursor: pointer;
    }
  }
`;

export default CommentCard;
