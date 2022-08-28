import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Movie() {
  //const params = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/movies/${id}`)
        console.log(response);
        setProject(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/movies/${id}`);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Movie details</h2>
      {project && (
        <div>
          <h4>Movie: {project.title}</h4>
          <p>
            <img width="250px" src={project.image} alt={`Pic of ${project.title}`} />
          </p>
          <p>Year: {project.year}</p>
          <p>Director: {project.director}</p>
          <p>Synopsis: {project.synopsis}</p>
          

          <button onClick={handleDelete}>Delete movie</button>
          <button onClick={() => navigate(`/edit/${id}`)}>Edit movie</button>
          
        </div>
        )}
      {!project && <p>Movie not found</p>}
     
    </div>
  )
}
