import { Link } from 'react-router-dom';
import ROUTES from '../lib/routes';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div style={styles.column}>
            <h5 style={styles.glowText}>⚡ Quespiration</h5>
            <ul style={styles.list}>
              <li><Link to={ROUTES.PROFILE} style={styles.neonLink}>🚀 My Profile</Link></li>
              <li><Link to={ROUTES.CONSTRUCTOR_OF_QUEST} style={styles.neonLink}>🎮 Quest Constructor</Link></li>
              <li><a href="#" style={styles.neonLink}>🌍 Language</a></li>
            </ul>
          </div>

          <div style={styles.column}>
            <h5 style={styles.glowText}>📡 Contact Us</h5>
            <ul style={styles.list}>
              <li style={styles.neonText}>📞 +380972854114</li>
              <li style={styles.neonText}>📧 info@gmail.com</li>
            </ul>
          </div>
        </div>

        <div style={styles.copyright}>
          <p>© 2025 Quespiration Corporation</p>
          <p>🌐 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
const styles = {
  footer: {
    background: 'radial-gradient(circle, #001f3f, #000a1f, #000519)',
    padding: '50px 0',
    textAlign: 'center',
    borderTop: '3px solid #00e5ff',
    boxShadow: '0 -4px 25px rgba(0, 229, 255, 0.8)',
    position: 'relative',
    overflow: 'hidden',
    animation: 'pulseFooter 5s infinite alternate',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  column: {
    marginBottom: '20px',
  },
  glowText: {
    color: '#00e5ff',
    fontSize: '22px',
    fontWeight: 'bold',
    textShadow: '0 0 15pxrgb(241, 241, 241), 0 0 25px #0077ff',
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: '2px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  neonLink: {
    color: 'white',
    fontSize: '22px',
    textDecoration: 'none',
    display: 'block',
    marginTop: '8px',
    fontFamily: "'Orbitron', sans-serif",
    transition: '0.3s ease-in-out',
  },
  neonText: {
    color: 'white',
    fontSize: '22px',
    fontFamily: "'Orbitron', sans-serif",
  },
  copyright: {
    marginTop: '30px',
    color: '#ffffff',
    fontSize: '24px',
    fontFamily: "'Orbitron', sans-serif",
  },
};
const stylesWithAnimations = `
  @keyframes pulseFooter {
    0% { box-shadow: 0 -4px 25px rgba(0, 229, 255, 0.8); }
    100% { box-shadow: 0 -4px 35px rgba(0, 229, 255, 1); }
  }
  @keyframes glowNeon {
    0% { text-shadow: 0 0 10px #00e5ff, 0 0 20px #0077ff; }
    50% { text-shadow: 0 0 15px #00e5ff, 0 0 30px #0077ff; }
    100% { text-shadow: 0 0 10px #00e5ff, 0 0 20px #0077ff; }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = stylesWithAnimations;
document.head.appendChild(styleSheet);

export default Footer;
