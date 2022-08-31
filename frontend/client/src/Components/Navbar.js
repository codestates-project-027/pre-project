import styled from 'styled-components';
import { ReactComponent as Logo } from '../assets/LogoGlyphMd.svg';
import { Link } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';

const Navbar = ({ isLogin, logoutHandler }) => {
  return (
    <NavCss>
      <Link to="/">
        <div className="navbar-container">
          <Logo />
          <Stack>stack</Stack>
          <OverFlow>overflow</OverFlow>
        </div>
      </Link>
      <div>
        <Products>Products</Products>
      </div>
      <span>
        <HiSearch className="searchIcon" size="19px" />
        <Searchbar placeholder="Search..." />
      </span>
      <div className="buttons">
        {isLogin ? (
          <>
            <LogoutBtn onClick={logoutHandler}>Log out</LogoutBtn>
            <Link to="/mypage">
              <MypageBtn>My Page</MypageBtn>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <LoginBtn>Log in</LoginBtn>
            </Link>
            <Link to="/join">
              <SignupBtn>Sign up</SignupBtn>
            </Link>
          </>
        )}
      </div>
    </NavCss>
  );
};

export default Navbar;

const NavCss = styled.header`
  background-color: rgb(247, 248, 248);
  display: flex;
  justify-content: center;
  position: relative;
  border-top: 3px solid #f48024;
  box-shadow: 5px 2px rgba(0, 0, 0, 0.1);
  margin: 0;
  align-items: center;
  height: 50px;
  width: 100%;
  z-index: 1000;

  a {
    text-decoration: none;
    color: black;
  }

  .navbar-container {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    &:hover {
      padding: 10px;
      padding-top: 2px;
      padding-bottom: 2px;
      background-color: rgba(230, 230, 230, 0.8);
    }
  }
  .logo {
    width: 100px;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    margin-left: 60px;
  }
  span {
    width: 40%;
  }

  .searchIcon {
    position: absolute;
    top: 20px;
    transform: translate(80%, -10%);
    color: rgb(112, 121, 131);
  }
`;

const Products = styled.div`
  width: 90px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1%;
  border-radius: 100px;
  &:hover {
    background-color: rgba(230, 230, 230, 0.8);
  }
`;

const Searchbar = styled.input`
  margin-left: 1.2%;
  height: 27px;
  width: 100%;
  padding: 3px 0px 0px 30px;
  border: 1px solid rgb(178, 183, 188);
  border-radius: 2px;
`;

const LogInButton = styled.button`
  width: 70px;
  height: 35px;
  background-color: rgb(219, 233, 242);
  border-radius: 10%;
  border: 1px solid rgb(38, 104, 144);
  color: rgb(38, 104, 144);
  cursor: pointer;
`;
const SignUpButton = styled.button`
  font-weight: 600;
  width: 85px;
  height: 35px;
  background-color: rgb(0, 139, 250);
  border-radius: 10%;
  border: none;
  color: rgb(255, 255, 255);
  margin-left: 3px;
  cursor: pointer;
`;

const Stack = styled.div`
  margin-left: 5%;
  font-weight: 400;
`;

const OverFlow = styled.div`
  font-weight: bold;
`;

const LoginBtn = styled.button`
  width: 70px;
  height: 35px;
  background-color: rgb(219, 233, 242);
  border-radius: 10%;
  border: 1px solid rgb(38, 104, 144);
  color: rgb(38, 104, 144);
  cursor: pointer;
`;
const SignupBtn = styled.button`
  font-weight: 600;
  width: 85px;
  height: 35px;
  background-color: rgb(0, 139, 250);
  border-radius: 10%;
  border: none;
  color: rgb(255, 255, 255);
  margin-left: 3px;
  cursor: pointer;
`;

const LogoutBtn = styled.button`
  width: 85px;
  height: 35px;
  background-color: rgb(219, 233, 242);
  border-radius: 10%;
  border: 1px solid rgb(38, 104, 144);
  color: rgb(38, 104, 144);
  cursor: pointer;
`;

const MypageBtn = styled.button`
  font-weight: 600;
  width: 85px;
  height: 35px;
  background-color: rgb(0, 139, 250);
  border-radius: 10%;
  border: none;
  color: rgb(255, 255, 255);
  margin-left: 3px;
  cursor: pointer;
`;
