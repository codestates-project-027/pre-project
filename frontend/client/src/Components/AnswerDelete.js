import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AnswerDelete = ({ deleteUrl, dataEl, jwtToken, isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  const deleteAnswer = async () => {
    try {
      const headers = { headers: { Authorization: `Bearer ${jwtToken}` } };
    await axios.delete(deleteUrl + dataEl.id, headers);
    window.location.reload();
  } catch (err) {
    if (err.response) {
      alert(`만료된 토큰입니다. 다시 로그인해주세요`);
      setIsLogin(false)
      navigate('/login');
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
