import styled from 'styled-components';
// import img from '../assets/landingimg.png';
import img from '../assets/landingScroll.png'

const LandingPage = () => {
  return (
    <div className="landingpage-container">
      <Div>
        {/* <img className="landing_img" alt="landingimg" src={img} /> */}
        <img className="landing_img" alt="landing img" src={img} />
      </Div>
    </div>
  );
};

const Div = styled.div`
  display: flex;
  background-color: rgb(248,250,249);

  .landing_img {
    width: 100%;
    height:100%;
  }
`;

export default LandingPage;
