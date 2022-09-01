import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const CommentCard = () => {
  const url = '/question/'; //서버경로 수정
  const [data, setData] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  // const [commentData, setCommentData] = useState([]);
  const { id } = useParams();

  const getData = async () => {
    const getResponse = await axios(url + id);
    setData(getResponse.data);
    setAnswerData(getResponse.data.answerList);
    // setCommentData(getResponse.data.answerList[0].commentList);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <CommentCardCSS>
        {answerData.map((el) => {
          <>
            <div className="comments" key={el.id}>
              <div className="hr-line" />
              <div className="comment">comment data{el.commentList}</div>
              <div className="hr-line" />
            </div>
          </>;
        })}
      </CommentCardCSS>
    </>
  );
};

const CommentCardCSS = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  .hr-line {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 20px;
    border: 0.5px solid rgb(241, 242, 243);
  }
  .comment {
    margin-left: 20px;
  }
`;

export default CommentCard;
