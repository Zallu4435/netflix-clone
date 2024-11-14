import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title, catagory}) => {

  // for scrolling with mouse =====>
  /* const cardsRef = useRef();

  // const handleWheel = (event) => {
  //     event.preventDefault();
  //     cardsRef.current.scrollleft += event.deltaY
  //   }

  //   useEffect(() => {
  //     cardsRef.current.addEventListener('wheel', handleWheel)
       },[]) */

  const [apiData, setApiData] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3M2FkYjUyZTBiMTUyYjJhMTIwMWMzOTM5YjcwY2Q3NiIsIm5iZiI6MTczMTA3MjUzMS43MzYxNzcyLCJzdWIiOiI2NzJlMTA3ZjdkY2FiMmEwYTYxN2NlMDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bWo_pqXdQCCbIrnLxTCpAqFypmunsvogkzHw1C71rHo'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${catagory ? catagory : 'now_playing'}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
         
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list'>    {/* ref={cardsRef} => for scrolling with mouse */}
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`}
            className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt='' />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards



