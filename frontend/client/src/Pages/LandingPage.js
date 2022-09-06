import styled from 'styled-components';
import img from '../assets/landingScroll.png';

const LandingPage = () => {
  localStorage.removeItem('title');
  localStorage.removeItem('body');
  localStorage.removeItem('edit-answer');
  localStorage.removeItem('tags-block');
  localStorage.removeItem('tags');
  return (
    <div className="landingpage-container">
      <Div>
        <img className="landing_img" alt="landing img" src={img} />
      </Div>
    </div>
  );
};

const Div = styled.div`
  display: flex;
  background-color: rgb(248, 250, 249);

  .landing_img {
    width: 100%;
    height: 100%;
  }
`;

export default LandingPage;
