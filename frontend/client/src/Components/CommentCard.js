import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const CommentCard = ({commentData}) => {

  return (
    <>
      <CommentCardCSS>
          {commentData
            ? commentData.map((el) => (
                <div className="comments" key={el.id}>
                  <div className="hr-line"/>    
                  <span className="contents">{el.contents}</span>
                  <span className="username">&#11;-&#31;{el.userName}</span>
                  <span className="createdAt">{el.createdAt}</span>
                  <div className="hr-line"/>     
                </div>
              ))
            : null}
      </CommentCardCSS>
    </>
  );
};

const CommentCardCSS = styled.div`
  margin-top: 20px;
  font-weight: 400;
  margin-left: 20px;
  

  .comments{
  
  .hr-line {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 0.5px solid rgb(241, 242, 243);
  }
  .contents {
    margin-left: 20px;
    width: fit-content;
  }
  .username{
    margin-left: 20px;
    width: fit-content;
    color: rgb(49,114,198);
  }
  .createdAt{
    margin-left: 20px;
    width: fit-content;
    color: rgb(146,153,160);
  }
  }
  
`;

export default CommentCard;
