import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Portfolio from './pages/Portfolio'
import MovieDetail from './pages/MovieDetail'
import ContactUs from './pages/ContactUs'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-brand-dark font-body">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<MovieDetail />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
