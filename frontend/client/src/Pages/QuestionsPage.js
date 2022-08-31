import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import OverflowBlog from '../assets/overflowblog.png';
import Pagination from '../Components/Pagination';
import AskButton from '../Components/AskButton';

const QuestionsPage = ({ isLogin }) => {
  const [data, setData] = useState([]);
  //pagination
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const url = 'http://localhost:8080/posts';

  //GET 요청
  const getData = async () => {
    const getResponse = await axios(url);
    setData(getResponse.data);
  };

  useEffect(() => {
    getData();
  }, []);

  //tab 메뉴 관련
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: 'Newest' },
    { name: 'Active' },
    { name: 'Bountied' },
    { name: 'Unanswered' },
    { name: 'More' },
  ];

  const selectMenuHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <>
      <Div>
        <div className="main--wrapper">
          <div className="head--wrapper">
            <div className="head">
              All Questions
              {isLogin ? (
                <Link to="/askquestionpage">
                  <AskButton>Ask Question</AskButton>
                </Link>
              ) : (
                <Link to="/login">
                  <LoginDesc>you can use after login</LoginDesc>
                </Link>
              )}
            </div>
          </div>

          <div className="innerquestions--wrapper">
            <div className="filtermenus--wrapper">
              <div>{data.length} questions</div>

              <div className="buttons--wrapper">
                <TabMenu>
                  {menuArr.map((el, index) => {
                    return (
                      <li
                        key={index}
                        className={
                          currentTab === index ? 'submenu active' : 'submenu'
                        }
                        onClick={() => selectMenuHandler(index)}
                      >
                        {el.name}
                      </li>
                    );
                  })}
                </TabMenu>
                <Filter>Filter</Filter>
              </div>
            </div>

            <div className="questions-wrapper">
              {data.slice(offset, offset + limit).map((item) => (
                <div style={{ width: '100%' }} key={item.id}>
                  <QuestionCard>
                    <div className="question--wrapper">
                      <div className="sidequestion--wrapper">
                        <div className="vote">{item.vote} votes</div>
                        <div className="answerview">{item.answer} answers</div>
                        <div className="answerview">{item.view} views</div>
                      </div>
                      <div className="mainquestion--wrapper">
                        <Link
                          to={`/posts/${item.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <div className="title">{item.title}</div>
                        </Link>
                        <div className="body">{item.body}</div>

                        <div className="mainquestion--bottom--wrapper">
                          <div className="tags">{item.tags} </div>
                          <div className="author--and--time">
                            <p className="author">{item.author}</p>{' '}
                            <p className="createdAt"> asked {item.createdAt}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </QuestionCard>
                </div>
              ))}
            </div>
            <Pagination
              total={data.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>

        <div className="sub--wrapper">
          <img className="overflowblog" alt="blog" src={OverflowBlog} />{' '}
          {/* assets : overflowblog.png삭제 후 커밋하기 //merge 후 추가해서 commit*/}
        </div>
      </Div>
    </>
  );
};

export default QuestionsPage;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  .head--wrapper {
    margin-top: 20px;
    width: 95%;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    /* margin-bottom: 50px; */
    font-size: 1.7rem;
  }
  .main--wrapper {
    display: flex;
    width: 100%;
    margin-left: 30px;
    flex-direction: column;
    align-items: center;
  }
  .questions--wrapper {
    display: flex;
    flex-direction: column;
  }
  img.overflowblog {
    margin-left: 20px;
    margin-top: 22px;
    width: 300px;
  }
  .innerquestions--wrapper {
    display: flex;
    width: 95%;
    flex-direction: column;
  }
  .filtermenus--wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .buttons--wrapper {
    display: flex;
  }
  .questions-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const QuestionCard = styled.div`
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
  .mainquestion--bottom--wrapper {
    display: flex;
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
    /* background-color:bisque; */
    margin-bottom: -10px;
  }
  .tags {
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
const TabMenu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(134, 140, 147);
  font-weight: bold;

  .submenu {
    width: 100%;
    padding: 10px 10px;
    cursor: pointer;
    list-style: none;
  }
  li {
    border: 1px solid rgba(134, 140, 147, 0.6);
    border-radius: 2px;
  }

  .active {
    background-color: rgba(229, 236, 242);
    transition: 0.3s;
    color: rgba(110, 156, 159);
  }
`;
const Filter = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  padding: 10px 10px;
  background-color: rgba(227, 236, 243);
  color: rgba(110, 156, 159);
  border: 1px solid rgba(72, 114, 153, 0.6);
  border-radius: 2px;
  font-weight: bold;
  cursor: pointer;
`;

const LoginDesc = styled.button`
  width: 220px;
  height: 35px;
  background-color: rgba(227, 236, 243);
  color: rgba(110, 156, 159);
  border-radius: 2px;
  border: 1px solid rgb(120, 155, 158, 0.5);
  cursor: pointer;
`;
