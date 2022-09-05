import styled from 'styled-components';

const Pagination = ({id, page, offset,toPrevPage, numPages, selectPage, toNextPage}) => {
  return (
    <>
      <GlobalDiv>
        {console.log(`id:${id},page:${page},offset:${offset}`)}
        <Button onClick={toPrevPage}>&lt;</Button>
        {Array(numPages)
          .fill()
          .map((_, el) => (
            <Button
              className="page--btn"
              key={el + 1}
              onClick={() => {
                selectPage(el);
              }}
              aria-current={id === el + 1 ? 'page' : null}
            >
              {el + 1} {/*setPage */}
            </Button>
          ))}
        <Button onClick={toNextPage}>&gt;</Button>
      </GlobalDiv>
    </>
  );
};

export default Pagination;

//pagination
const GlobalDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  color: rgba(109, 115, 122);
  font-size: 1rem;
  background-color: white;

  &:hover {
    cursor: pointer;
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
    background-color: white;
  }

  &[aria-current] {
    color: rgb(110, 180, 210);
    font-weight: bold;
    cursor: revert;
    transform: revert;
    background-color: rgb(229, 236, 242);
  }
`;
