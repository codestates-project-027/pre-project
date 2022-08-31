import styled from 'styled-components';

const QSidebar = () => {
  return (
    <>
      <Test2>
        <Steps>Steps 1 2 3</Steps>
      </Test2>
    </>
  );
};

export default QSidebar;

const Test2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(241, 242, 243);
  width: 30%;
  height: 100vh;
`;

const Steps = styled.div`
  background-color: white;

  width: 70%;
  height: 70%;
`;
