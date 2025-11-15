import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

function App() {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <About />
      <Events />
      <Gallery />
      <Footer />
    </div>
  )
}

export default App
