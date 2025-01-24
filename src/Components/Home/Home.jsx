import React, { useState } from 'react';
import './Home.scss';
import Chat from '../Chat/Chat';

const Home = () => {
  // State to manage whether the menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function for menu
  const handleMenuChange = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className='menubar'>
        {/* Menu button (SVG icon) */}
        <div className='menu-btn' onClick={handleMenuChange}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
        </div>

        {/* Conditionally rendered menu list */}
        <div className={`list-container ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
      </div>

      <h2>Convert Text to SQL</h2>
      <Chat />
    </>
  );
};

export default Home;
