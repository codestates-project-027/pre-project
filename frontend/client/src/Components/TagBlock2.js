import styled from 'styled-components';

const TagBlock2 = ({ tag }) => {
  const newArr = tag.split(',');
  return (
    <>
      <TagBlockCSS2>
        {newArr.map((el, idx) => (
          <span key={idx} className="block">
            {el}
          </span>
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
