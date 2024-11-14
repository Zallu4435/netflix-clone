import { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import Search from '../Search/Searchbar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchShow, setSearchShow] = useState(false);
  const searchRef = useRef(null);  // Ref to track the search input area

  const handleSearch = () => {
    setSearchShow((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) && !event.target.matches('.icons')) {
        setSearchShow(false); // Close search if click is outside
      }
    };

    // Disable scrolling when the search bar is shown
    if (searchShow) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
      // Ensure no-scroll class is removed when the component unmounts
      document.body.classList.remove('no-scroll');
    };
  }, [searchShow]); // Dependency on searchShow to run whenever the search bar visibility changes

  return (
    <div className="navbar">
      {searchShow && (
        <div ref={searchRef} className="search-container">
          <Search />
        </div>
      )}

      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img
          src={search_icon}
          alt="Search Icon"
          className="icons"
          onClick={handleSearch}
        />
        <p>Children</p>
        <img src={bell_icon} alt="Bell Icon" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Caret Icon" />
          <div className="dropDown">
            <p>Sign Out of Netflix</p>
          </div>
        </div>
        <Link to='/login' className='sign-in-btn'>Sign In</Link>
      </div>
    </div>
  );
};

export default Navbar;
