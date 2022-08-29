import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const movie = await axios.get(
          `http://localhost:8000/api/v1/movies/${id}`
        );
        setMovie(movie.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [id]);

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
      const actualMovie = await axios.post('http://localhost:8000/api/v1/movies', movie);
      navigate(`/movie/${actualMovie.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }




  return (
    <div>
      <h2>Edit movie</h2>

      {!movie && <p>Loading</p>}
      {movie && (
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={movie.title} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image" value={movie.image} onChange={handleChange} />
        <input type="number" name="year" placeholder="Year" value={movie.year} onChange={handleChange} />
        <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} />
        <input type="text" name="synopsis" placeholder="Synopsis" value={movie.synopsis} onChange={handleChange} />
        <button type="submit">Save changes</button>
      </form>
      )}
    </div>
  )
}
