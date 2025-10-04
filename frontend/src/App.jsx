import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ApprovalCard from './components/ApprovalCard'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar always visible */}
        <Navbar />

        {/* Page content */}
        <div className="flex-grow px-6 py-4">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/expenses" element={<Expenses />} /> */}
          </Routes>
          {/* <ApprovalCard /> */}
        </div>

        <Footer />
      </div>
    </Router>
  )
}

export default App
