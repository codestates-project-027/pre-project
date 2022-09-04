import styled from 'styled-components';
import TagBlock2 from './TagBlock2';

const TagBlock = ({tags}) => {

    return(
        <>
        <TagBlockCSS>
            {tags.map((tag,idx)=>(
                <TagBlock2 key={idx} tag={tag}/>
            ))}
            </TagBlockCSS>
            
        </>
    )
}

export default TagBlock;

const TagBlockCSS = styled.span`
`