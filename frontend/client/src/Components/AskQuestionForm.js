import axios from 'axios';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AskQuestionForm = ({ jwtToken, userInfoUserName, setIsLogin }) => {
  const url = '/question';
  const [userName, setUsername] = useState(userInfoUserName);

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  //tag blocks
  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTags = (event) => {
    const filtered = tags.filter((el) => el === event.target.value);
    if (event.target.value !== '' && filtered.length === 0) {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTags(event);
    }
  };

  const discard = () => {
    setTitle('');
    setContents('');
    setTags('');
  };

  console.log(tags)
  const postData = async (e) => {
    e.preventDefault();
    if (title === '' || contents === '' || tags.length===0) {
      alert(`내용을 입력하세요`);
      return;
    }
    try {
      const headers = { headers: { Authorization: `Bearer ${jwtToken}` } };
      const tagsResolved = tags.join(',') // ['1,2,3,4'] 꼴로 파싱 
      const post = {
        title,
        contents,
        userName,
        // tags: [JSON.parse(JSON.stringify(tags))],
        tags: [JSON.parse(JSON.stringify(tagsResolved))],
      };

      await axios.post(url, post, headers).then(() => {
        navigate('/questionspage');
        window.location.reload();
      });
    } catch (err) {
      if (err.response.status === 400) {
        alert(`내용을 입력하세요`);
      } else if (err.response.status === 403) {
        alert(`만료된 토큰입니다. 다시 로그인해주세요`);
        setIsLogin(false);
        navigate('/login');
      }
    }
  };

  return (
    <Test>
      <div className="form">
        <div className="wrapper">
          <div className="main-first">Title</div>
          <div className="main">
            Be specific and imagine you are asking a question to another person
          </div>
          <input
            className="main"
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. is there an R function for finding the index of an element in a vector?"
          />
        </div>

        <div className="wrapper">
          <div className="main-first">Body</div>
          <div className="main">
            Include all the information someone would need to answer your
            question
          </div>

          <textarea
            className="main"
            type="text"
            value={contents}
            required
            onChange={(e) => setContents(e.target.value)}
          />
        </div>

        <div className="wrapper">
          <div className="main-first">Tag</div>
          <div className="main">
              Add up to 5 tags to describe what your question in about
          </div>

          <TagsInput>
            <span id="tags">
              {tags.map((tag, index) => (
                <li key={index} className="tag">
                  <span className="tag-title">{tag}</span>
                  <span
                    className="tag-close-icon"
                    onClick={() => removeTags(index)}
                  >
                    &times;
                  </span>
                </li>
              ))}
            </span>
            <span className="tag--wrapper">
            <input
              className="tag-input"
              type="text"
              onKeyUp={handleKeyUp}
              placeholder="e.g. (iphone android sql)"
            />
            </span>
            
          </TagsInput>
          <div className="wrapper-button">
            <Button1 onClick={postData}>Review your question</Button1>
            <Button2 onClick={discard}>Discard draft</Button2>
          </div>
        </div>
      </div>
    </Test>
  );
};

export default AskQuestionForm;

const Test = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(241, 242, 243);
  width: 70%;
  height: 100vh;
  color: rgb(47, 47, 47);

  .form {
    display: flex;
    flex-direction: column;
    width: 80%;
    background-color: white;
    margin-left: 11%;
    height: fit-content;
    box-shadow: 7px 8px 10px 0px gray;

    div.wrapper {
      background-color: white;
      .main {
        display: flex;
        text-align: left;
        justify-content: flex-start;
        margin: 10px;
        margin-left: 20px;
        &-first {
          display: flex;
          justify-content: flex-start;
          margin-left: 20px;
          margin-top: 25px;
          justify-content: flex-start;
          font-weight: bold;
        }
        :focus {
        outline: transparent;
        &:focus-within {
        border: 1px solid rgb(140, 186, 229);
        box-shadow: 5px 5px 5px rgb(218, 232, 241);
  }
    }
      }
    }

    button {
      display: flex;
      justify-content: flex-start;
      margin: 20px;
    }

    div.wrapper-button {
      display: flex;
    }

    input {
      flex: 1 auto !important;
      font-size: 13px;
      -webkit-appearance: none;
      width: 85%;
      margin: 0;
      padding: 0.6em 0.7em;
      border: 1px solid #bbc0c4;
      border-radius: 3px;
      background-color: #fff;
      color: #0c0d0e;
      line-height: 1.15384615;
      &::placeholder {
        opacity: 0.6;
      }
    }

    textarea {
      flex: 1 auto !important;
      font-size: 13px;
      -webkit-appearance: none;
      width: 85%;
      height: 250px;
      margin: 0;
      padding: 0.6em 0.7em;
      border: 1px solid #bbc0c4;
      border-radius: 3px;
      background-color: #fff;
      color: #0c0d0e;
      line-height: 1.15384615;
    }
  }
`;

const Button1 = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: rgb(67, 147, 247);
  width: 150px;
  border: none;
  height: 50px;
  border-radius: 2px;
  border: 1px solid skyblue;
  color: white;
  cursor: pointer;
`;

const Button2 = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: transparent;
  width: 23%;
  border: none;
  height: 40px;
  color: rgb(180, 59, 57);
  cursor: pointer;
`;

export const TagsInput = styled.div`
  margin: 10px;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 570px;
  padding: 0 8px;
  border: 1px solid lightgrey;
  border-radius: 6px;
  margin-left: 20px;
  #tags {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;
    > .tag {
      width: auto;
      display: flex;
      height : 30px;
      align-items: center;
      justify-content: center;
      color: rgb(57, 104, 146);
      padding: 0px 8px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: rgb(218, 232, 241);
      > .tag-close-icon {
        display: block;
        width: 16px; height: 16px;
        line-height: 13px;
        text-align: center;
        margin-left: 8px;
        color: white;
        border-radius: 50%;
        background: rgb(57, 104, 146);
        cursor: pointer;
      }
    }
  }

  .tag--wrapper{
    padding-bottom : 3px;
    .tag-input {
    display:flex;
    flex: 1;
    margin-left: 3px;
    border: none;
    width: 200px; 
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }
  }
 
  &:focus-within {
    border: 1px solid rgb(140, 186, 229);
    box-shadow: 5px 5px 5px rgb(218, 232, 241);
  }
`;