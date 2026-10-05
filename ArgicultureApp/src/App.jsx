import { Route, Routes } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import Croprecc from './Croprecc'
import About from './About'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 px-4 py-8">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Croprecc />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
