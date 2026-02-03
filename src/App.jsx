import { BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import News from './news';
import WeatherApp from './Weather'

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <div className="main-wrapper"> 
        <Routes>
          <Route path="/" element={<Navigate to="/weather" />} />
          <Route path="/weather" element={<WeatherApp />} />
          
          {/* You might need to add a standard padding wrapper inside your News Component 
             or just add class="pt-5 mt-5" to the News container div.
          */}
          <Route path="/news" element={<div style={{paddingTop: '100px'}}><News /></div>} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
