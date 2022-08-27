import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

export default function Home() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/movies')
        console.log(response)
        setProjects(response.data.data);
      } catch (error) {
        console.error(error)
      }
    }
    getData();
  }, [])

  return (
    <div>
      <h2>Home</h2>
      {!projects && <p>Loading</p>}
      {projects && projects.map(project => {
        return <Card key={project._id} movie={project} />
      })}
    </div>
  )
}
