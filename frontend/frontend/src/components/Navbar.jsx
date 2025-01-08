import React, { useState } from 'react';


const Navbar = () => {
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsHamburgerOpen(!isHamburgerOpen);
  };
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsHamburgerOpen(false);
  };

  return (
    <nav className="bg-pink-600 text-white font-Jost p-[12px] md:p-[12px] flex items-center justify-between h-16 sm:h-20">
      
      <div className="font-Lobster sm:text-2xl"><a href="#">Comfy</a></div>

     
      <div
        id="nav-menu"
        className={`z-50 absolute top-0 left-0 min-h-[80vh] w-full bg-pink-600/80 backdrop-blur-sm flex items-center justify-center duration-500 ease-in-out overflow-hidden lg:static lg:min-h-fit lg:bg-transparent lg:w-auto ${isMenuOpen ? 'left-0' : 'left-[-100%]'}`}
      >
        <ul className="flex flex-col items-center gap-8 lg:flex-row">
          <li>
            <a href="#home"
             className="nav-link"
             onClick={handleLinkClick}>Home</a>
          </li>
          <li>
            <a href="#about" className="nav-link"
            onClick={handleLinkClick}>About</a>
          </li>
          <li>
            <a href="#popular" className="nav-link"
            onClick={handleLinkClick}>Popular</a>
          </li>
          <li>
            <a href="#review" className="nav-link"
            onClick={handleLinkClick}>Review</a>
          </li>
        </ul>

       
        
      </div>

     
      <div
        className={`text-xl sm:text-3xl cursor-pointer z-50 lg:hidden  
        ${isHamburgerOpen ? 'ri-close-large-line' : 'ri-menu-4-line'}`}
        onClick={toggleMenu} >
      </div>
    </nav>
  );
};

export default Navbar;
