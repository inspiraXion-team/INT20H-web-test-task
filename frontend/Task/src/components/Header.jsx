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
    buttonStyle: {
      borderRadius: '20px', // Кругла рамка
      transition: 'border-color 0.3s', // Анімація зміни кольору рамки
      border: '2px solid transparent', // Початкова рамка
      padding: '5px 15px', // Внутрішні відступи
    },
    buttonHover: {
      borderColor: 'orange', // Оранжевий колір рамки для кнопок мови
    },
    loginButtonHover: {
      borderColor: 'blue', // Синій колір рамки для кнопки Log In / Sign In
    },
  };

  // Обробники подій
  const handleLanguageChange = (lang) => {
    console.log(`Language changed to: ${lang}`);
    // Тут можна додати логіку для зміни мови
  };

  const handleMenuClick = (route) => {
    console.log(`Navigating to: ${route}`);
    // Тут можна додати логіку для навігації
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
            {/* Другий рядок з основним меню */}
            <Nav className="justify-content-center flex-grow-1" style={styles.navbarNav}>
              <Button
                variant="outline-secondary"
                size="sm"
                style={styles.buttonStyle}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = styles.buttonHover.borderColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                onClick={() => handleMenuClick('/study')}
              >
                Study
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                style={styles.buttonStyle}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = styles.buttonHover.borderColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                onClick={() => handleMenuClick('/fun')}
              >
                Fun
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                style={styles.buttonStyle}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = styles.buttonHover.borderColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                onClick={() => handleMenuClick('/teambuilding')}
              >
                Teambuilding
              </Button>
            </Nav>

            {/* Верхній рядок з посиланнями, вибором мови та фото користувача */}
            <Nav style={styles.navbarNav}>
              <Button
                variant="outline-secondary"
                size="sm"
                style={styles.buttonStyle}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = styles.loginButtonHover.borderColor}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                onClick={() => handleMenuClick(ROUTES.AUTH)}
                className="me-3"
              >
                Log In / Sign In
              </Button>

              {/* Вибір мови */}
              <div className="btn-group me-3">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  style={styles.buttonStyle}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = styles.buttonHover.borderColor}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                  onClick={() => handleLanguageChange('UKR')}
                >
                  UKR
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  style={styles.buttonStyle}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = styles.buttonHover.borderColor}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                onClick={() => handleLanguageChange('ENG')}
              >
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
                <Dropdown.Item as={Link} to="/profile" style={styles.dropdownItem} onClick={() => handleMenuClick('/profile')}>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/completed-quests" style={styles.dropdownItem} onClick={() => handleMenuClick('/completed-quests')}>
                  Completed Quests
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/logout" style={styles.dropdownItem} onClick={() => handleMenuClick('/logout')}>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);
}

export default Header;