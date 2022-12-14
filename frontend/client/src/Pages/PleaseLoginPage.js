import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PleaseLoginPage = () => {
  localStorage.removeItem('title');
  localStorage.removeItem('body');
  localStorage.removeItem('edit-answer');
  localStorage.removeItem('tags-block');
  localStorage.removeItem('tags');
  return (
    <>
      <PlzLoginCSS>
        <div>
          <h2>Sorry</h2>
          <p>PAGE NOT FOUND : you need login</p>
          <Link to="/login">Click to login...</Link>
        </div>
      </PlzLoginCSS>
    </>
  );
};

export default PleaseLoginPage;

const PlzLoginCSS = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
