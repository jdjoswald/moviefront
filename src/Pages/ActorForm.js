import React from 'react'
import FormActor from '../components/FormActor'
import { useParams } from 'react-router-dom';

export const ActorForm = () => {
  let { id } = useParams();
  return (
    <div>
      <FormActor
      idActor={id}/>
    </div>
  )
}
