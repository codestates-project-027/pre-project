import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TagBlock2 = ({ tag, setTagChecked }) => {
  const newArr = tag.split(',');
  return (
    <>
      <TagBlockCSS2>
        {newArr.map((el, idx) => (
          <Link style={{ textDecoration: 'none' }} key={idx} to="/tagspage">
            <span
              key={idx}
              value={el}
              className="block"
              onClick={() => {
                setTagChecked(el);
              }}
            >
              {el}
            </span>
          </Link>
        ))}
      </TagBlockCSS2>
    </>
  );
};

export default TagBlock2;

const TagBlockCSS2 = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  .block {
    background: rgb(227, 236, 243);
    color: rgb(72, 114, 153);
    width: fit-content;
    padding: 3px;
    padding-left: 7px;
    padding-right: 7px;
    border-radius: 5px;
    margin: 0 8px 8px 0;
    cursor: pointer;
  }
`;
