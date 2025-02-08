import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import Auth from './pages/Auth/Auth'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
      <HomePage />
       <Auth />
      </main>
      <Footer />
    </div>
  )
}

export default App