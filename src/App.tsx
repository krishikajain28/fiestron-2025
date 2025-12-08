import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import ScrollToTop from './components/ScrollToTop'

// Scroll sections
import Header from './components/Header'
import HomeAndAbout from './components/HomeAndAbout'
import Announcements from './components/Announcements'
import Sponsors from './components/Sponsors'
import Footer from './components/Footer'

// Dedicated pages
import Team from './components/Team'
import Events from './components/Events'
import Gallery from './components/Gallery/Gallery'
import Contact from './components/Contact'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* <--- ADD THIS HERE */}
      <Routes>
        {/* Homepage with scroll sections */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomeAndAbout />
              <Announcements />
              <Sponsors />
              <Footer />
            </>
          }
        />

        {/* Dedicated routed pages */}
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App