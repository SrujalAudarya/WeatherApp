import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    // REPLACED 'bg-dark' with 'transparent-nav'
    <nav className="navbar navbar-expand-lg navbar-dark transparent-nav">
      <div className="container">
        
        <Link className="navbar-brand font-weight-bold text-uppercase" to="/">
          <span style={{ color: '#4dabf7' }}>My</span>Dash
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleNavCollapse} 
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          style={{ border: 'none' }} // Remove border for cleaner look
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          {/* Added a background for mobile view so links are readable when expanded */}
          <ul className="navbar-nav ml-auto" 
              style={!isNavCollapsed ? { background: 'rgba(0,0,0,0.9)', padding: '20px', borderRadius: '10px' } : {}}
          >
            
            <li className="nav-item">
              <NavLink 
                to="/weather"
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Weather
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/news"
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Tech News
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;