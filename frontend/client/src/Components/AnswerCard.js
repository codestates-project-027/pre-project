import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentCard from './CommentCard';
import styled from 'styled-components';
import axios from 'axios';
import {
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsFillBookmarkStarFill,
  BsClockHistory,
} from 'react-icons/bs';

const AnswerCard = () => {
  const url = '/question/';
  const deleteUrl = '/answer/';

  const [answerData, setAnswerData] = useState([]);

  const { id } = useParams();

  const getData = async () => {
    //answerData = 가져온 answer data [{}]
    const getResponse = await axios(url + id); //서버경로
    setAnswerData(getResponse.data.answerList); //JSON.stringify(answerData) = [{},{},{},{}]
    // console.log(JSON.stringify(answerData));
  };

  const deleteAnswer = async () => {
    //API체크 후 수정
    await axios.delete(deleteUrl + id);
    window.location.reload();
  };

  //setContents 할 수 있는 창 열기

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AnswerCardDefault>
        <div className="answers--wrapper">
          {answerData
            ? answerData.map((el) => (
                <div key={el.id}>
                  <div className="answers--icon--content">
                    <div className="answers--icons">
                      <BsFillCaretUpFill size="15" className="bs click" />
                      <p className="bs">{el.votes}0</p>
                      <BsFillCaretDownFill size="15" className="bs click" />
                      <BsFillBookmarkStarFill
                        size="11"
                        className="bs add click"
                      />
                      <BsClockHistory size="11" className="bs add click" />
                    </div>

                    <div className="answers--content">{el.contents}</div>
                  </div>

                  <div className="answers--edit--delete--author">
                    <div className="one">
                      <div className="answers--edit--delete">
                        {/* {localStorage.setItem('answer', el.contents)} */}
                        <Link to={`/answer/edit/${id}`} className="edit">
                          Edit
                        </Link>

                        <div className="delete" onClick={deleteAnswer}>
                          Delete
                        </div>
                      </div>

                      <div className="author--date">
                        <div className="author">{el.userName} answered</div>
                        <div className="createdAt">{el.createdAt}</div>
                      </div>
                    </div>
                    <div className="two">
                      <div className="comment--wrapper">
                        <CommentCard/>
                        <div className="comment--button">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add a comment
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </AnswerCardDefault>
    </>
  );
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
    p {
      color: rgb(188, 191, 195);
    }
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
    flex-direction: column;
    width: 100%;
    /* background-color:bisque; */
  }
  .comment--button {
    display: flex;
    margin-top: 10px;
    width: 680px;
    color: rgb(182, 186, 191);
    font-weight: bold;
    /* justify-content: right; */

    &:hover {
      color: rgb(107, 135, 166);
      cursor: pointer;
    }
  }
`;

export default AnswerCard;
