import styled from 'styled-components';
import axios from 'axios';

const DeleteCommntBtn = ({ id }) => {
  const deleteCommentUrl = '/comment/';
  const deleteComment = async () => {
    await axios.delete(deleteCommentUrl + id);
    window.location.reload();
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
