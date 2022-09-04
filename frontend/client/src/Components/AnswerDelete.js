import axios from 'axios';

const AnswerDelete = ({ deleteUrl, dataEl, jwtToken, isLogin }) => {

  const deleteAnswer = async () => {
    try {
      const headers = { headers: { Authorization: `Bearer ${jwtToken}` } };
    await axios.delete(deleteUrl + dataEl.id, headers);
    window.location.reload();
    }
    catch (err) {
      if (err.response){
        alert(`작성자가 아닙니다.`)
      }

    }
    
  };

  return (
    <>
      {dataEl.userName === localStorage.getItem('user-name')? (<button style={style} onClick={deleteAnswer}>
        Delete
      </button>):null}
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
