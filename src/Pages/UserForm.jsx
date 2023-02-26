import React from 'react'
import UserFormComponent from '../components/UserFormComponent'
import { useParams } from 'react-router-dom';


export const UserForm = () => {
  let { id } = useParams();
  return (
    <div><UserFormComponent
    idUser={id}/></div>
  )
}
