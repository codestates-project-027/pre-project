import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPage = () => {
  localStorage.removeItem('title');
  localStorage.removeItem('body');
  localStorage.removeItem('edit-answer');
  localStorage.removeItem('tags-block');
  localStorage.removeItem('tags');
  return (
    <>
      <NotFoundCSS>
        <div>
          <h2>Sorry</h2>
          <p>PAGE NOT FOUND</p>
          <Link to="/">Back to Home..</Link>
        </div>
      </NotFoundCSS>
    </>
  );
};

export default NotFoundPage;

const NotFoundCSS = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
