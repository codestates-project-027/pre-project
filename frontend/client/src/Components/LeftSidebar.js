import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoEarthSharp } from 'react-icons/io5';
import { useState } from 'react';

const LeftSidebar = () => {
  const [homeActive, setHomeActive] = useState(true);
  const [qActive, setQActive] = useState(false);

  const HomeCheckUrl = () => {
    setHomeActive(!homeActive);
    setQActive(false);
    setHomeActive(true);
  };

  const QCheckUrl = () => {
    setQActive(!qActive);
    setHomeActive(false);
    setQActive(true);
  };

  return (
    <LeftSideCss>
      <MenuWrapper>
        <Link to="/">
          <Menu onClick={HomeCheckUrl} className={homeActive ? 'active' : null}>
            Home
          </Menu>
        </Link>

        <Menu>PUBLIC</Menu>

        <Link to="/questionspage">
          {' '}
          <Submenu onClick={QCheckUrl} className={qActive ? 'active' : null}>
            <IoEarthSharp />
            &nbsp;Questions
          </Submenu>
        </Link>

        <Submenu className="submenu">Tags</Submenu>
        <Submenu className="submenu">Users</Submenu>
        <Submenu className="submenu">Companies</Submenu>
      </MenuWrapper>
    </LeftSideCss>
  );
};

export default LeftSidebar;

const LeftSideCss = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  /* box-shadow: 1px 1px 1px rgba(229,229,229,0.7); */
  height: 100%;
  padding: 10px 0;
  a {
    text-decoration: none;
    color: black;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .active {
    background-color: rgb(239, 240, 241);
    transition: 0.3s;
    width: calc(68% + 6px);
    border-right: 4px solid rgb(253, 119, 48);
    border-radius: 2px;
    font-weight: bold;
  }

  .submenu {
    width: calc(56% + 6px);
    margin-left: 93px;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 70px; //130->70
  width: 200px;
  height: 50px;
  padding-left: 10px;
`;
const Submenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 70px;
  width: 200px;
  height: 50px;
  padding-left: 10px;
`;
