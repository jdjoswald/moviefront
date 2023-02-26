import React from 'react'
import NewUserForm from '../components/NewUserForm'

export const Singin = () => {
  const user = JSON.parse(sessionStorage.getItem("user"))
  return (
    <div><NewUserForm/></div>
  )
}
