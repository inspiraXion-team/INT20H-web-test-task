import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../lib/routes';
import logo from "../assets/logo.png";
import userPhoto from '../assets/user-photo.png'; // Зображення користувача
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';

function Header() {
  // Об'єкт стилів
  const styles = {
    customHeader: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Напівпрозорий білий фон
      padding: '10px 0',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Тінь для заголовка
    },
    customLogo: {
      height: '50px', // Розмір логотипу
    },
    userPhoto: {
      width: '40px',
      height: '40px',
      cursor: 'pointer',
    },
    navbarNav: {
      gap: '20px', // Відступи між елементами меню
    },
    navbarToggler: {
      border: 'none', // Видалити рамку кнопки "бургер"
    },
    dropdownMenu: {
      border: 'none',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    dropdownItem: {
      color: '#333',
      padding: '10px 20px',
    },
  };

  return (
    <header style={styles.customHeader}>
      <Navbar expand="lg" className="navbar-dark bg-transparent">
        <Container fluid>
          {/* Логотип */}
          <Navbar.Brand as={Link} to={ROUTES.HOME}>
            <img src={logo} alt="Logo" style={styles.customLogo} />
          </Navbar.Brand>

          {/* Кнопка "бургер" для малих екранів */}
          <Navbar.Toggle aria-controls="navbar-nav" style={styles.navbarToggler} />

          {/* Основне меню */}
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            {/* Верхній рядок з посиланнями, вибором мови та фото користувача */}
            <Nav style={styles.navbarNav}>
              <Nav.Link as={Link} to={ROUTES.AUTH} className="text-black me-3">
                Log In / Sign In
              </Nav.Link>

              {/* Вибір мови */}
              <div className="btn-group me-3">
                <Button variant="secondary" size="sm">
                  UKR
                </Button>
                <Button variant="primary" size="sm">
                  ENG
                </Button>
              </div>

              {/* Фото користувача з випадаючим списком */}

              <Dropdown align="end">
                <Dropdown.Toggle as="div" className="user-dropdown">
                  <img
                    src={userPhoto}
                    alt="User "
                    style={styles.userPhoto}
                    className="rounded-circle"
                  />
                </Dropdown.Toggle>


                <Dropdown.Menu style={styles.dropdownMenu}>
                  <Dropdown.Item as={Link} to="/profile" style={styles.dropdownItem}>
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/completed-quests" style={styles.dropdownItem}>
                    Completed Quests
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/logout" style={styles.dropdownItem}>
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            {/* Другий рядок з основним меню */}
            <Nav className="justify-content-center flex-grow-1" style={styles.navbarNav}>
              <Nav.Link as={Link} to="/study" className="text-white">
                Study
              </Nav.Link>
              <Nav.Link as={Link} to="/fun" className="text-white">
                Fun
              </Nav.Link>
              <Nav.Link as={Link} to="/teambuilding" className="text-white">
                Teambuilding
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;