import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

const CommentBtn = ({ id, headers, userName }) => {
  const postCommentUrl = '/comment';
  const [addComment, setAddComment] = useState(false);
  const [contents, setContents] = useState([]);
  const commentHandler = () => {
    setAddComment(!addComment);
  };
  const postComment = async () => {
    await axios.post(postCommentUrl, { answerId: id, contents, userName }, headers);
    // window.location.reload();
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
