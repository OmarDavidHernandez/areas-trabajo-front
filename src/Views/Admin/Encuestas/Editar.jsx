import React from 'react'
import FormEncuesta from '../../../Components/FormEncuesta'
import { useParams } from 'react-router-dom'

const EditarEncuesta = () => {
  const {id} = useParams();
  return (
    <FormEncuesta id={id} titulo='Modificar encuesta' />
  )
}

export default EditarEncuesta