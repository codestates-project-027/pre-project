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
import CommentCard from './CommentCard';

const AnswerCard = () => {
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

  return (
    <>
      <AnswerCardDefault>
        <div className="answers--wrapper">
          {answerData
            ? answerData.map((el) => (
                <div key={el.id}>
                  <div className="answers--icon--content">
                    <div className="answers--icons">
                      <BsFillCaretUpFill size="20" className="bs click" />
                      <p className="bs">{JSON.stringify(el.vote)}</p>
                      <BsFillCaretDownFill size="20" className="bs click" />
                      <BsFillBookmarkStarFill
                        size="13"
                        className="bs add click"
                      />
                      <BsClockHistory size="13" className="bs add click" />
                    </div>

                    <div className="answers--content">
                      {JSON.stringify(el.answerContent).replace(/"/g, '')}
                    </div>
                  </div>

                  <div className="answers--edit--delete--author">
                    <div className="one">
                      <div className="answers--edit--delete">
                        <div className="edit">Edit</div>
                        <div className="delete">Delete</div>
                      </div>

                      <div className="author--date">
                        <div className="author">
                          {JSON.stringify(el.author)} answered
                        </div>
                        <div className="createdAt">
                          {JSON.stringify(el.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="two">
                      <div className="comment--wrapper">
                      {/* <CommentCard/> */}
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
