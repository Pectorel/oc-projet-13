import { NavLink, useNavigate } from "react-router-dom";
import {
  faUserCircle,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const nav = useNavigate();

  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(logout());
    nav("/");
  };

  const showNavMenu = (userInfo) => {
    if (userInfo != null) {
      return (
        <>
          <NavLink className="main-nav-item" to="/profile">
            <FontAwesomeIcon icon={faUserCircle} />
            {userInfo["firstName"]}
          </NavLink>
          <a href={"#"} className="main-nav-item" onClick={() => userLogout()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Sign Out
          </a>
        </>
      );
    }

    return (
      <NavLink className="main-nav-item" to="/login">
        <FontAwesomeIcon icon={faUserCircle} />
        Sign In
      </NavLink>
    );
  };

  return (
    <header>
      <nav className="main-nav">
        <h1>
          <NavLink className="main-nav-logo" to={`/`}>
            <img
              className="main-nav-logo-image"
              src="/img/argentBankLogo.png"
              alt="Logo Argent Bank"
            />
          </NavLink>
          <span className="sr-only">Argent Bank</span>
        </h1>
        <div>{showNavMenu(userInfo)}</div>
      </nav>
    </header>
  );
}

export default Header;
