import { Link } from 'react-router-dom';
import ROUTES from '../lib/routes';
import logo from '/logo.png';
import userPhoto from '/user-photo.png'; // Зображення користувача

function Header() {
  return (
    <header className="custom-header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container flex-column">
          {/* Верхній рядок з логотипом і посиланнями */}
          <div className="d-flex justify-content-between align-items-center w-100 mb-2">
            <div className="d-flex">
              <Link className="nav-link text-black me-3" to={ROUTES.AUTH}>
                Log In/ Sign In
              </Link>
            </div>

            {/* Логотип */}
            <div className="logo-container">
            <Link to={ROUTES.HOME}><img src={logo} alt="Logo" className="custom-logo" /> </Link>
            </div>

            {/* Вибір мови та фото користувача */}
            <div className="d-flex align-items-center">
              <div className="btn-group me-3">
                <button className="btn btn-secondary btn-sm">UKR</button>
                <button className="btn btn-primary btn-sm">ENG</button>
              </div>

              {/* Фото користувача з випадаючим списком */}
              <div className="dropdown">
  <img
    src={userPhoto}
    alt="User"
    className="user-photo rounded-circle"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  />
                  <ul className="dropdown-menu dropdown-menu-end">
    <li>
      <Link className="dropdown-item" to="/profile">
        My Profile
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/completed-quests">
        Completed Quests
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/logout">
        Log Out
      </Link>
    </li>
  </ul>
              </div>
            </div>
          </div>

          {/* Другий рядок */}
          <div className="d-flex justify-content-center w-100">
            <ul className="navbar-nav nav-center">
              <li className="nav-item">
                <Link className="nav-link" to="/study">
                  Study
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/fun">
                  Fun
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teambuilding">
                  Teambuilding
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
