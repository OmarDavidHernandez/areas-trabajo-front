import React from 'react'
import FormEspacio from '../../../Components/FormEspacio'
import { useParams } from 'react-router-dom'

const EditarEspacio = () => {
  const {id} = useParams();
  return (
    <FormEspacio id={id} titulo='Modificar espacio' />
  )
}

export default EditarEspacio