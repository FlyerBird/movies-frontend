import React from 'react'
import { Link } from 'react-router-dom';

export default function Card(props) {
 
  const {movie} = props;

  return (
    // Use to display each one of the movies
    <div>
      <img src= {movie.image} alt="" width="100px"/>
      <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
    </div>
  )
}
