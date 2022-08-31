import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h2>Sorry</h2>
      <p>PAGE NOT FOUND</p>
      <Link to="/">Back to Landing page</Link>
    </div>
  );
};

export default NotFoundPage;
