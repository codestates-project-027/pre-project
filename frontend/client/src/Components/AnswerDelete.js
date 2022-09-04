import axios from 'axios';

const AnswerDelete = ({ deleteUrl, dataEl, jwtToken }) => {

  const deleteAnswer = async () => {
    const headers = { headers: { Authorization: `Bearer ${jwtToken}` } };
    // const answer = { contents: dataEl.contents };
    await axios.delete(deleteUrl + dataEl.id, headers);
    window.location.reload();
  };

  return (
    <>
      <button style={style} onClick={deleteAnswer}>
        Delete
      </button>
    </>
  );
};

export default AnswerDelete;

const style = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'rgb(183, 186, 190)',
  cursor: 'pointer',
};
