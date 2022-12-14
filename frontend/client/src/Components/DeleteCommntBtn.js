import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteCommntBtn = ({ id, headers, setIsLogin }) => {
  const navigate = useNavigate();
  const deleteCommentUrl = '/comment/';
  const deleteComment = async () => {
    try {
      await axios.delete(deleteCommentUrl + id, headers);
      window.location.reload();
    } catch (err) {
      if (err.response) {
        alert(`만료된 토큰입니다. 다시 로그인해주세요`);
        setIsLogin(false);
        navigate('/login');
      }
    }
  };
  return (
    <>
      <DeleteCommntCss onClick={deleteComment}>&times;</DeleteCommntCss>
    </>
  );
};

export default DeleteCommntBtn;

const DeleteCommntCss = styled.span`
  width: fit-content;
  margin-left: 10px;
  padding-left: 4px;
  padding-right: 4px;
  padding-bottom: 2px;
  border-radius: 3px;
  &:hover {
    background-color: rgba(228, 228, 230, 0.5);
    color: rgba(130, 130, 130);
    cursor: pointer;
  }
`;
