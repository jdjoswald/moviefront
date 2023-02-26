import React from 'react'
import PaisTable from '../components/PaisTable'
import DirectorTable from '../components/DirectorTable'
import GenerosTable from '../components/GenerosTable'

export const Setting = () => {
  return (
    <div>
      <GenerosTable/>
      <DirectorTable/>
      <PaisTable/>
    </div>
  )
}
