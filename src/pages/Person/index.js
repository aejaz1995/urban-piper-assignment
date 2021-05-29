import React,{ useState, useEffect } from 'react';
import './index.css';
import { useParams, useHistory } from "react-router-dom"
import axios from 'axios';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"


function Person() {

  const [ details, setDetails ] = useState( {} )
  const history = useHistory()
  const { id } = useParams()
  
  useEffect(()=>{
    //  network request call
    axios.get(`https://swapi.dev/api/people/${id}`)

    .then((response) => { setDetails({ ...response.data }) })

  })
  
  // go back to home page
  const handleBack =() =>{
    history.push("/")
  }

  return (
    <div className="person">
      
        <h1> { details.name } </h1>

      <div className="person__details">

          <p> <span> <b> Height </b> </span> <span> { details.height } cm </span> </p>  

          <p> <span> <b> Mass </b> </span> <span> { details.mass } kg </span> </p>
          
          <p> <span> <b> Hair color </b> </span> <span> {details.hair_color } </span> </p>
          
          <p> <span> <b> Skin color </b> </span> <span> { details.skin_color } </span> </p>
          
          <p> <span> <b> Eye color </b> </span> <span> { details.eye_color } </span> </p>
          
          <p> <span> <b> Gender </b> </span> <span> { details.gender } </span> </p>

      </div>
      <button onClick = { handleBack}> <HiOutlineArrowNarrowLeft/> </button>
    </div>
  );
}

export default Person;
