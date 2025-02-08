import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth/Auth';
import ROUTES from './lib/routes';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route exact path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.AUTH} element={<Auth />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;