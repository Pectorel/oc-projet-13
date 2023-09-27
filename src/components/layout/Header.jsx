import { NavLink } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  return (
    <header>
      <nav className="main-nav">
        <h1>
          <NavLink className="main-nav-logo" to={`/`}>
            <img
              className="main-nav-logo-image"
              src="/public/img/argentBankLogo.png"
              alt="Logo Argent Bank"
            />
          </NavLink>
          <span className="sr-only">Argent Bank</span>
        </h1>
        <div>
          <NavLink className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
