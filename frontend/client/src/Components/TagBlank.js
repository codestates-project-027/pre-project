import styled from 'styled-components';
import TagBlock from './TagBlock';

const TagBlank = ({ tags }) => {
  //tags=['1,2,3,4,5']
  const block = [tags];
  return (
    <>
      <TagBlockCSS>
        <TagBlock tags={block} />
      </TagBlockCSS>
    </>
  );
};

export default TagBlank;

const TagBlockCSS = styled.span``;
