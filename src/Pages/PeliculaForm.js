import React from 'react'
import FormPelicula  from '../components/FormPelicula'
import { useParams } from 'react-router-dom';

export const PeliculaForm = () => {
  let { id } = useParams();
  return (
    <div>
      <FormPelicula 
      idPelicula={id}/>
    </div>
  )
}
