import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ROUTES from './lib/routes';
import Auth from './pages/Auth/Auth';
import CompletedQuests from './pages/CompletedQuests.jsx';
import ConstructorOfQuest from './pages/ConstructorOfQuest.jsx';
import HomePage from './pages/HomePage';
import Logout from './pages/Logout.jsx';
import Profile from './pages/MyProfile.jsx';
import MyQuests from './pages/MyQuests.jsx';
import Quest from './pages/Quest/Quest.jsx';
import QuestPreview from './pages/QuestPreview/QuestPreview.jsx';

import './App.css';

const questAuthor2 = {
    name: "Alice Smith",
    avatar: "src/assets/avatar-placeholder.png",
};

const questData2 = {
    questName: "Enigma Expedition",
    timeLimit: 2700,
    backgroundImage: "src/assets/QuestMapBlack.png",
    levels: [
        {
            id: 1,
            question: {
                type: "open",
                question: "What year did the Titanic sink?",
                answer: "1912",
            },
        },
        {
            id: 2,
            question: {
                type: "test",
                question: "Which planet is known as the 'Red Planet'?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correctOption: 1, // Index of "Mars"
            },
        },
        {
            id: 3,
            question: {
                type: "image",
                question: "Click on the hidden symbol in the image.",
                image: "src/assets/QuestMap.png",
                targetArea: { x1: 50, y1: 50, x2: 100, y2: 100 }, // Example area
            },
        },
        {
            id: 4,
            question: {
                type: "image",
                question: "Click on the hidden symbol in the image.",
                image: "src/assets/QuestMap.png",
                targetArea: { x1: 50, y1: 50, x2: 100, y2: 100 }, // Example area
            },
        },
    ],
};

const App = () => {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            {/* Public routes */}
            <Route exact path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.AUTH} element={<Auth />} />
            <Route path={ROUTES.QUEST_PREVIEW} element={<QuestPreview />} />

            {/* Protected routes */}
            <Route 
              path={ROUTES.PROFILE} 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.COMPLETED_QUESTS} 
              element={
                <ProtectedRoute>
                  <CompletedQuests />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.LOGOUT} 
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.QUEST} 
              element={
                <ProtectedRoute>
                  <Quest questData={questData2} questAuthor={questAuthor2} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.CONSTRUCTOR_OF_QUEST} 
              element={
                <ProtectedRoute>
                  <ConstructorOfQuest />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.MY_QUESTS} 
              element={
                <ProtectedRoute>
                  <MyQuests />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;