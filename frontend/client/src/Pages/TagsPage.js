// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import OverflowBlog from '../assets/overflowblog.png';
// import AskButton from '../Components/AskButton';
// import QuestionCard from '../Components/QuestionCard';
// import MoreTab from '../Components/MoreTab';

// const TagsPage = ({ isLogin, limit, totalPosts }) => {
//   localStorage.removeItem('title');
//   localStorage.removeItem('body');
//   localStorage.removeItem('edit-answer');
//   localStorage.removeItem('tags-block');
//   localStorage.removeItem('tags');

//   const pageUrl = '/question?page=';
//   const [data, setData] = useState([]);
//   const [answerData, setAnswerData] = useState([]);
//   const [id, setId] = useState(1);
//   const [open, setOpen] = useState(false);

//   //Pagination
//   const numPages = Math.ceil(totalPosts / limit);

//   const selectPage = (el) => {
//     setId(el + 1);
//   };
//   const toPrevPage = () => {
//     if (id !== 1) {
//       setId(id - 1);
//     }
//   };

//   const toNextPage = () => {
//     if (id !== numPages) {
//       setId(id + 1);
//     }
//   };

//   //Date calculations
//   const newlyDated = () => {
//     // calculatedTime
//   };

//   //GET tag pages
 
//   const getData = async () => {
//     const getResponse = await axios(pageUrl + id);
//     setData(getResponse.data.content);
//     setAnswerData(getResponse.data.answerList);
//   };

//   useEffect(() => {
//     getData();
//   }, [id]);

//   //tab 메뉴 관련
//   const [currentTab, setCurrentTab] = useState(0);
//   const [menuArr, setMenuArr] = useState([
//     { name: 'Newest' },
//     { name: 'Active' },
//     { name: 'Bountied' },
//     { name: 'Unanswered' },
//     { name: 'More' },
//   ]);

//   const selectMenuHandler = (index, el) => {
//     setCurrentTab(index);
//     if (index === 0 && el.name === 'Newest') {
//       //Oldest로 토글되게 div 띄우기
//       setMenuArr([
//         { name: 'Oldest' },
//         { name: 'Active' },
//         { name: 'Bountied' },
//         { name: 'Unanswered' },
//         { name: 'More' },
//       ]);
//       getOldestData();
//     }
//     if (index === 0 && el.name === 'Oldest') {
//       setMenuArr([
//         { name: 'Newest' },
//         { name: 'Active' },
//         { name: 'Bountied' },
//         { name: 'Unanswered' },
//         { name: 'More' },
//       ]);
//       getData();
//     }
//     if (index === 1) {
//       //Active
//       getActiveData();
//     }

//     if (index === 4) {
//       setOpen(!open);
//     }
//   };

//   return (
//     <>
//       <Div>
//         <div className="main--wrapper">
//           <div className="head--wrapper">
//             <div className="head">
//               All Questions
//               {isLogin ? (
//                 <Link to="/askquestionpage">
//                   <AskButton>Ask Question</AskButton>
//                 </Link>
//               ) : (
//                 <Link to="/login">
//                   <LoginDesc>you can use after login</LoginDesc>
//                 </Link>
//               )}
//             </div>
//           </div>

//           <div className="innerquestions--wrapper">
//             <div className="filtermenus--wrapper">
//               <div>{data.length} questions</div>

//               <div className="buttons--wrapper">
//                 <TabMenu>
//                   {menuArr.map((el, index) => {
//                     return (
//                       <li
//                         key={index}
//                         className={
//                           currentTab === index ? 'submenu active' : 'submenu'
//                         }
//                         onClick={() => selectMenuHandler(index, el)}
//                       >
//                         {el.name}
//                       </li>
//                     );
//                   })}
//                 </TabMenu>
//                 <Filter>Filter</Filter>
//               </div>
//             </div>
//             {currentTab === 4 ? (
//               <MoreTab
//                 mostViews={mostViews}
//                 mostVotes={mostVotes}
//                 mostAnswers={mostAnswers}
//                 leastViews={leastViews}
//                 leastVotes={leastVotes}
//                 leastAnswers={leastAnswers}
//                 open={open}
//               />
//             ) : null}

//             <div className="questions-wrapper">
//               {data.map((item) => (
//                 <div style={{ width: '100%' }} key={item.id}>
//                   <QuestionCard
//                     activeTime={item.active}
//                     item={item}
//                   />
//                 </div>
//               ))}
//             </div>

//             <GlobalDiv>
//               <Button onClick={toPrevPage}>&lt;</Button>
//               {Array(numPages)
//                 .fill()
//                 .map((_, el) => (
//                   <Button
//                     className="page--btn"
//                     key={el + 1}
//                     onClick={() => {
//                       selectPage(el);
//                     }}
//                     aria-current={id === el + 1 ? 'page' : null}
//                   >
//                     {el + 1} {/*setPage */}
//                   </Button>
//                 ))}
//               <Button onClick={toNextPage}>&gt;</Button>
//             </GlobalDiv>
//           </div>
//         </div>

//         <div className="sub--wrapper">
//           <img className="overflowblog" alt="blog" src={OverflowBlog} />{' '}
//         </div>
//       </Div>
//     </>
//   );
// };

// export default TagsPage;

// const Div = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-top: 15px;
//   .head--wrapper {
//     margin-top: 20px;
//     width: 95%;
//   }
//   .head {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     /* margin-bottom: 50px; */
//     font-size: 1.7rem;
//   }
//   .main--wrapper {
//     display: flex;
//     width: 100%;
//     margin-left: 30px;
//     flex-direction: column;
//     align-items: center;
//   }
//   .questions--wrapper {
//     display: flex;
//     flex-direction: column;
//   }
//   img.overflowblog {
//     margin-left: 20px;
//     margin-top: 22px;
//     width: 300px;
//   }
//   .innerquestions--wrapper {
//     display: flex;
//     width: 95%;
//     flex-direction: column;
//   }
//   .filtermenus--wrapper {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
//   .buttons--wrapper {
//     display: flex;
//   }
//   .questions-wrapper {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//   }
// `;

// const TabMenu = styled.ul`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: rgba(134, 140, 147);
//   font-weight: bold;

//   .submenu {
//     width: 100%;
//     padding: 10px 10px;
//     cursor: pointer;
//     list-style: none;
//   }
//   li {
//     border: 1px solid rgba(134, 140, 147, 0.6);
//     border-radius: 2px;
//   }

//   .active {
//     background-color: rgba(229, 236, 242);
//     transition: 0.3s;
//     color: rgba(110, 156, 159);
//   }
// `;
// const Filter = styled.ul`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-left: 10px;
//   padding: 10px 10px;
//   background-color: rgba(227, 236, 243);
//   color: rgba(110, 156, 159);
//   border: 1px solid rgba(72, 114, 153, 0.6);
//   border-radius: 2px;
//   font-weight: bold;
//   cursor: pointer;
// `;

// const LoginDesc = styled.button`
//   width: 220px;
//   height: 35px;
//   background-color: rgba(227, 236, 243);
//   color: rgba(110, 156, 159);
//   border-radius: 2px;
//   border: 1px solid rgb(120, 155, 158, 0.5);
//   cursor: pointer;
// `;

// //pagination
// const GlobalDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 4px;
//   margin: 16px;
// `;

// const Button = styled.button`
//   border: none;
//   border-radius: 8px;
//   padding: 8px;
//   margin: 0;
//   color: rgba(109, 115, 122);
//   font-size: 1rem;
//   background-color: white;

//   &:hover {
//     cursor: pointer;
//   }

//   &[disabled] {
//     cursor: revert;
//     transform: revert;
//     background-color: white;
//   }

//   &[aria-current] {
//     color: rgb(110, 180, 210);
//     font-weight: bold;
//     cursor: revert;
//     transform: revert;
//     background-color: rgb(229, 236, 242);
//   }
// `;
