import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommentBtn = ({ id, headers, userName, setUserName, setIsLogin }) => {
  const navigate = useNavigate();
  const postCommentUrl = '/comment';
  const [addComment, setAddComment] = useState(false);
  const [contents, setContents] = useState([]);
  const commentHandler = () => {
    setAddComment(!addComment);
  };
  {console.log(contents)}
  const postComment = async () => {
    if (contents.length===0){alert(`내용을 입력하세요`); return ;}
    setUserName(localStorage.getItem('user-name'));
    try {await axios.post(postCommentUrl, { answerId: id, contents, userName }, headers);
    window.location.reload();
    } catch (err) {
      if (err.response) {
        alert(`만료된 토큰입니다. 다시 로그인해주세요`);
        setIsLogin(false)
        navigate('/login');
      }
    }
    
  };

  return (
    <>
      {addComment ? (
        <CommentInputCSS>
          <div className="box--on">
            <textarea onChange={(e) => setContents(e.target.value)} />

            <div className="choice--wrapper">
              <div className="ok--btn" onClick={postComment}>
                Add
              </div>
              <div className="cancel--btn" onClick={commentHandler}>
                Cancel
              </div>
            </div>
          </div>
        </CommentInputCSS>
      ) : (
        <div style={BoxOffDiv}>
          <button style={BoxOffBtn} onClick={commentHandler}>
            Add a comment
          </button>
        </div>
      )}
    </>
  );
};

export default CommentBtn;

const CommentInputCSS = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .box--on {
    display: flex;
    flex-direction: column;
    textarea {
      width: 550px;
      line-height: 1.15384615;
    }
    .choice--wrapper {
      display: flex;
      margin-top: 5px;
      font-weight: 400;
      color: rgb(124, 129, 135);
      width: fit-content;

      .ok--btn {
        padding: 5px;
        font-weight: bold;
        cursor: pointer;
      }
      .cancel--btn {
        padding: 5px;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

const BoxOffDiv = {
  display: 'flex',
  justifyContent: 'right',
};

const BoxOffBtn = {
  display: 'flex',
  cursor: 'pointer',
  width: 'fit-content',
  backgroundColor: 'transparent',
  border: 'none',
  marginRight: '5px',
  color: 'rgb(109,115,122)',
};
