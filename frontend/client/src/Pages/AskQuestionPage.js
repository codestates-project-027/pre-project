import styled from 'styled-components';
import AskQuestionForm from '../Components/AskQuestionForm';
import QSidebar from '../Components/QSidebar';

const AskQuestionPage = ({ jwtToken, userInfo, setIsLogin }) => {
  localStorage.removeItem('title');
  localStorage.removeItem('body');
  localStorage.removeItem('edit-answer');
  localStorage.removeItem('tags-block');
  localStorage.removeItem('tags');

  return (
    <>
      <Title>Ask Question</Title>
      <Div>
        <AskQuestionForm
          jwtToken={jwtToken}
          userInfoUserName={JSON.parse(JSON.stringify(userInfo.username))}
          setIsLogin={setIsLogin}
        />
        {/* {console.log(
          `Form:${JSON.parse(JSON.stringify(userInfo.username))}`,
          jwtToken
        )} */}
        <QSidebar />
      </Div>
    </>
  );
};

export default AskQuestionPage;

const Div = styled.div`
  display: flex;
  align-items: start;
  background-color: rgb(241, 242, 243);
`;
const Title = styled.div`
  background-color: rgb(241, 242, 243);
  font-size: 25px;
  font-weight: 600;
  text-align: left;
  padding: 3%;
  padding-left: 7.8%;
`;
