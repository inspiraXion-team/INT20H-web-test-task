import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import ROUTES from './lib/routes';
import Auth from './pages/Auth/Auth';
import CompletedQuests from './pages/CompletedQuests.jsx';
import HomePage from './pages/HomePage';
import Logout from './pages/Logout.jsx';
import Profile from './pages/MyProfile.jsx';
import Quest from './pages/Quest/Quest.jsx';
import QuestPreview from './pages/QuestPreview/QuestPreview.jsx';

import './App.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route exact path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.AUTH} element={<Auth />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.COMPLETED_QUESTS} element={<CompletedQuests />} />
          <Route path={ROUTES.LOGOUT} element={<Logout />} />
          <Route path={ROUTES.QUEST_PREVIEW} element={<QuestPreview />} />
          <Route path={ROUTES.QUEST} element={<Quest />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;