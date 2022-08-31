import styled from 'styled-components';
import AskQuestionForm from '../Components/AskQuestionForm';
import QSidebar from '../Components/QSidebar';

const AskQuestionPage = () => {
  return (
    <>
      <Title>Ask Question</Title>
      <Div>
        <AskQuestionForm />
        <QSidebar />
      </Div>
    </>
  );
};

export default AskQuestionPage;

const Div = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(241, 242, 243);
`;
const Title = styled.div`
  background-color: rgb(241, 242, 243);
  font-size: 25px;
  font-weight: 600;
  text-align: left;
  padding: 3%;
  padding-left: 9.2%;
`;
