import styled from 'styled-components';
import TagBlock2 from './TagBlock2';

const TagBlock = ({ tags }) => {
  //tags=['1,2,3,4,5']
  return (
    <>
      <TagBlockCSS>
        {tags.map((tag, idx) => (
          <TagBlock2 key={idx} tag={tag} />
        ))}
      </TagBlockCSS>
    </>
  );
};

export default TagBlock;

const TagBlockCSS = styled.span``;
