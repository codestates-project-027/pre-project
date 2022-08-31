import styled from 'styled-components';
import img from '../landingimg.png';

const LandingPage = () => {
  return (
    <div className="landingpage-container">
      <Div>
        <img className="landing_img" alt="landingimg" src={img} />
      </Div>
    </div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 100vh;
  margin-left: 130px;

  .landing_img {
    width: 100vw;
    height: 100vh;
  }
`;

export default LandingPage;
