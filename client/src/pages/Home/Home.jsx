import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

// Home component to display the homepage layout with Navbar and Hero section
const Home = () => {
  return (
    <div className='home'>

      {/* Top navigation bar */}
      <Navbar />

      {/* Hero section with a background banner, title, description, and action buttons */}
      <div className='hero'>
        <img src={hero_banner} alt='' className='banner-img' />
        
        <div className='hero-caption'>
          <img src={hero_title} alt='' className='caption-img' />
          <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
          
          <div className='hero-btns'>
            <button className='btn'>
              <img src={play_icon} alt='' />
              Play
            </button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt='' />
              More Info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      {/* More Cards */}
      <div className='more-cards'>
        <TitleCards title={"Blockbuster Movies"} catagory={"top_rated"}/>
        <TitleCards title={"Only on Netflix"} catagory={"popular"} />
        <TitleCards title={"Upcoming"} catagory={"upcoming"} />
        <TitleCards title={"Top Pics for You"} catagory={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
