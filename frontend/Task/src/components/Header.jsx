import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../lib/routes';
import logo from "../assets/logo.png";
import userPhoto from '../assets/user-photo.png'; // User photo
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';

function Header() {
  // Styles for the header
  const styles = {
    customHeader: {
      background: 'linear-gradient(135deg, #0f0c29,rgb(9, 8, 24),rgb(19, 79, 83))',
      padding: '8px 0',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)', // Neon glow effect
      borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
    },
    customLogo: {
      height: '50px',
      filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.7))', // Neon glow effect for logo
    },
    userPhoto: {
      width: '40px',
      height: '40px',
      cursor: 'pointer',
      borderRadius: '50%',
      transition: 'transform 0.3s, box-shadow 0.3s',
      border: '2px solid rgba(0, 255, 255, 0.5)',
    },
    userPhotoHover: {
      transform: 'scale(1.1)',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.7)',
    },
    navbarNav: {
      gap: '20px',
    },
    dropdownMenu: {
      backgroundColor: 'fff',
      border: '1px solid rgba(0, 255, 255, 0.3)',
      boxShadow: '0 4px 15px rgba(0, 255, 255, 0.3)',
    },
    dropdownItem: {
      color: 'black', // Neon cyan color for dropdown items
      transition: 'background-color 0.3s, color 0.3s, transform 0.3s',
      padding: '10px 20px',
    },
    dropdownItemHover: {
      backgroundColor: 'rgba(0, 255, 255, 0.1)', // Light cyan on hover
      color: '#ffffff',
      transform: 'translateX(5px)',
    },
    loginButton: {
      backgroundColor: 'transparent',
      color: '#00ffff',
      border: '2px solid #00ffff',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '16px',
      transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
      textShadow: '0 0 5px rgba(0, 255, 255, 0.3)',
    },
    loginButtonHover: {
      backgroundColor: '#00ffff',
      color: '#000000',
      transform: 'scale(1.1)',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
    },
    languageButton: {
      backgroundColor: 'transparent',
      border: '2px solid #00ffff',
      color: '#00ffff',
      transition: 'all 0.3s',
      textShadow: '0 0 5px rgba(0, 255, 255, 0.3)',
      margin: '0 5px',
    },
    languageButtonHover: {
      backgroundColor: '#00ffff',
      color: '#000000',
      boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
    },
  };

  return (
    <header style={styles.customHeader}>
      <Navbar expand="lg" className="navbar-light bg-transparent">
        <Container fluid>
          {/* Логотип */}
          <Navbar.Brand as={Link} to={ROUTES.HOME}>
            <img src={logo} alt="Logo" style={styles.customLogo} />
          </Navbar.Brand>

          {/* Бургер-кнопка для мобільних пристроїв */}
          <Navbar.Toggle aria-controls="navbar-nav" className="border-0">
            <span className="navbar-toggler-icon" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))' }} />
          </Navbar.Toggle>

          {/* Меню */}
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav style={styles.navbarNav}>
              <Nav.Link as={Link} to={ROUTES.AUTH}>
                <Button
                  style={styles.loginButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = styles.loginButtonHover.backgroundColor;
                    e.currentTarget.style.color = styles.loginButtonHover.color;
                    e.currentTarget.style.boxShadow = styles.loginButtonHover.boxShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = styles.loginButton.backgroundColor;
                    e.currentTarget.style.color = styles.loginButton.color;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Log In
                </Button>
              </Nav.Link>
            </Nav>

            {/* Вибір мови */}
            <div className="btn-group me-3">
              <Button
                style={styles.languageButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.languageButtonHover.backgroundColor;
                  e.currentTarget.style.color = styles.languageButtonHover.color;
                  e.currentTarget.style.boxShadow = styles.languageButtonHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = styles.languageButton.backgroundColor;
                  e.currentTarget.style.color = styles.languageButton.color;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                UKR
              </Button>
              <Button
                style={styles.languageButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = styles.languageButtonHover.backgroundColor;
                  e.currentTarget.style.color = styles.languageButtonHover.color;
                  e.currentTarget.style.boxShadow = styles.languageButtonHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = styles.languageButton.backgroundColor;
 e.currentTarget.style.color = styles.languageButton.color;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                ENG
              </Button>
            </div>

            {/* Фото користувача з меню */}
            <Dropdown align="end">
              <Dropdown.Toggle as="div" className="user-dropdown">
                <img
                  src={userPhoto}
                  alt="User "
                  style={styles.userPhoto}
                  className="rounded-circle"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = styles.userPhotoHover.transform;
                    e.currentTarget.style.boxShadow = styles.userPhotoHover.boxShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu style={styles.dropdownMenu}>
                <Dropdown.Item
                  as={Link}
                  to="/profile"
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = styles.dropdownItemHover.backgroundColor;
                    e.currentTarget.style.transform = styles.dropdownItemHover.transform;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to="/completed-quests"
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = styles.dropdownItemHover.backgroundColor;
                    e.currentTarget.style.transform = styles.dropdownItemHover.transform;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  Completed Quests
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  to="/logout"
                  style={styles.dropdownItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = styles.dropdownItemHover.backgroundColor;
                    e.currentTarget.style.transform = styles.dropdownItemHover.transform;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;