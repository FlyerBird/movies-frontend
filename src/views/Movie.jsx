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
        //setProject(response.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [id]);

  return (
    <div>
      <h2>Movie details</h2>
      {/* Should be the detail of one movie  */}
      {/* Should have a delete button to delete the movie and then redirect to the Home */}
    </div>
  )
}
