import styled from 'styled-components';
import {Link} from 'react-router-dom';
import TagBlock from './TagBlock';

const QuestionCard = ({activeTime, calculatedTime, item, answerData}) => {
    return (
        <>
            <QuestionCardCSS>
            <div className="question--wrapper">
                      <div className="sidequestion--wrapper">
                        <div className="vote">{item.votes} votes</div>
                        <div className="answerview">
                          {answerData ? answerData.length : 0} answers
                        </div>
                        <div className="answerview">{item.views} views</div>
                      </div>
                      <div className="mainquestion--wrapper">
                        <Link
                          to={`/posts/${item.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div className="title">{item.title}</div>
                        </Link>
                        <div className="body">{item.contents}</div>

                        <div className="mainquestion--bottom--wrapper">
                          <TagBlock tags={item.tags}/>
                          <div className="author--and--time">
                            <p className="author">{item.userName}</p>{' '}
                            <p className="createdAt"> asked {item.createdAt}</p>
                          </div>
                        </div>
                      </div>
                    </div>
            </QuestionCardCSS>
        </>
    )
}

const QuestionCardCSS = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  border-top: 1px solid rgba(235, 236, 237);
  border-bottom: 1px solid rgba(235, 236, 237);
  text-decoration: none;
  color: black;

  .question--wrapper {
    display: flex;
    width: 100%;
    margin: 10px;
    padding: 10px;
    justify-content: center;
  }
  .sidequestion--wrapper {
    display: flex;
    flex-direction: column;
    text-align: right;
  }
  .mainquestion--wrapper {
    display: flex;
    width: 85%;
    margin-left: 20px;
    flex-direction: column;
  }

  .vote {
    font-weight: 600;
  }
  .answerview {
    margin-top: 10px;
    color: rgba(108, 115, 123, 0.9);
  }
  .title {
    font-weight: bolder !important;
    color: cadetblue;
  }
  .body {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 10px;
    width: 650px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: normal; */
    line-height: 1.2;
    word-wrap: break-word;
  }
  .mainquestion--bottom--wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: -10px;
  }
  .tags { //to delete
    background-color: rgb(227, 236, 243);
    color: rgb(72, 114, 153);
    border-radius: 5px;
    padding: 4px;
    padding-left: 7px;
    padding-right: 7px;
    cursor: pointer;
  }
  .author--and--time {
    display: flex;
    .author {
      color: rgb(103, 151, 213);
      font-weight: 700;
    }
    .createdAt {
      color: rgba(108, 115, 123);
      margin-left: 5px;
    }
  }
`;

export default QuestionCard;