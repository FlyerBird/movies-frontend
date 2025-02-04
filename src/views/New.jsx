import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function New() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: "",
    image: "",
    year: "",
    director: "",
    synopsis: ""
  });

  const handleChange = (e) => {
    setMovie(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMovie = await axios.post('http://localhost:8000/api/v1/movies', movie);
      //Not sure from whre the `/movie` is coming in the line below
      navigate(`/movie/${newMovie.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Create a movie</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={movie.title} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image" value={movie.image} onChange={handleChange} />
        <input type="number" name="year" placeholder="Year" value={movie.year} onChange={handleChange} />
        <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} />
        <input type="text" name="synopsis" placeholder="Synopsis" value={movie.synopsis} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
