import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth/Auth';
import ROUTES from './lib/routes';
import Profile from './pages/MyProfile.jsx';
import CompletedQuests from './pages/CompletedQuests.jsx';
import Logout from './pages/Logout.jsx';
import MyQuests from './pages/MyQuests.jsx';
import Constructor from './pages/Constructor.jsx';
import './App.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route exact path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
  <Route path="/completed-quests" element={<CompletedQuests />} />
      <Route path="/my-quests" element={<MyQuests />} />
      <Route path="/constructor" element={<Constructor />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;