import styled from 'styled-components';

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <GlobalDiv>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </GlobalDiv>
    </>
  );
}

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
    color: rgb(229, 136, 62);
    cursor: pointer;
    font-weight: bold;
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
    background-color: white;
  }

  &[aria-current] {
    //active
    background: rgb(229, 136, 62);
    color: rgb(255, 255, 255);
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
