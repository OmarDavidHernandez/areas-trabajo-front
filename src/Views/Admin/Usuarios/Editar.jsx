import React from 'react'
import FormUsuario from '../../../Components/FormUsuario'
import { useParams } from 'react-router-dom'

const EditarUsuario = () => {
  const {id} = useParams();
  return (
    <FormUsuario id={id} titulo='Editar usuario' />
  )
}

export default EditarUsuario