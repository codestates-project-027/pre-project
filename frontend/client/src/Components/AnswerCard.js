import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentCard from './CommentCard';
import styled from 'styled-components';
import axios from 'axios';
import AnswerDelete from './AnswerDelete';
import CommentBtn from './CommentBtn';

const AnswerCard = ({answerData, setAnswerData, commentData, setCommentData}) => {
  const deleteAnswerUrl = '/answer/';
  const { id } = useParams();
 

  
 

 
  //setComment 할 수 있는 창 열기



  return (
    <>
      <AnswerCardDefault>
        <div className="answers--wrapper">
          {answerData
            ? answerData.map((el) => (
              
                <div key={el.id}>     
                    <div className="answers--content">{el.contents}</div>
                  <div className="answers--edit--delete--author">
                    <div className="one">
                      <div className="answers--edit--delete">
                        {/* {localStorage.setItem('answer', el.contents)} */}
                        <Link
                          to={`/answer/edit/${id}`}
                          style={{ textDecoration: 'none' }}
                          className="edit"
                          state={{el}}
                        >
                          Edit
                        </Link>

                        <AnswerDelete deleteUrl={deleteAnswerUrl} dataEl={el} />
                      </div>

                      <div className="author--date">
                        <div className="author">{el.userName} answered</div>
                        <div className="createdAt">{el.createdAt}</div>
                      </div>
                    </div>
                    <div className="two">
                      <div className="comment--wrapper">
                        <CommentCard commentData={el.commentList}/>
                        <CommentBtn style={CommentBtnStyle} id={el.id} >
                          {/* {addComment? "e":"Add a comment"}{console.log(el)} */}
                        {/* <div key={el.id} onClick={()=>console.log(id)}>yes</div> */}
                  
                        </CommentBtn>
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
    width: 100%;
    margin-left: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
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
      /* margin-left: 23px; */
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
    font-weight: bold;
    flex-direction: column;
    width: 100%;
    /* background-color:bisque; */
  }
`;

const CommentBtnStyle = {
  "display": "flex",
  "marginTop": "10px",
    "width": "680px",
    "color": "rgb(182, 186, 191)",
    "marginLeft": "37px",
    "cursor":"pointer"
    // &:hover {
    //   color: rgb(107, 135, 166),
    //   cursor: pointer,
    // }
  }

export default AnswerCard;

