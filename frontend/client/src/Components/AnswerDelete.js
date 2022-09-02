import axios from 'axios';

const AnswerDelete = ({ deleteUrl, dataEl }) => {
  const deleteAnswer = async () => {
    const answer = { contents: dataEl.contents };
    await axios.delete(deleteUrl + dataEl.id, { data: answer });
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
