import React from 'react'
import {Link} from 'react-router-dom'
import {Container,Row,Col,Table,Card,CardBody,CardTitle,CardText,Button} from 'reactstrap'
import {useState,useEffect} from 'react'
import {confirmacion,enviarPeticion} from '../../../funciones'

const IndexUsuarios = () => {
    useEffect(()=>{
        obtenerUsuarios();
      },[]);
      const [usuarios,setUsuarios] = useState([]);
      const obtenerUsuarios = async() =>{
        const res = await enviarPeticion('GET','','/usuarios','',true);
        setUsuarios(res.data);
      }
      const eliminarUsuario = (id,nombre) =>{
        confirmacion(nombre,('/usuarios/'+id),'/usuarios','',true);
      }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className='mt-5 border border-warning bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle className=''>
                    <CardText className='h4'>Usuarios</CardText>
                    <Link to={'/crear-usuario'} className='btn btn-dark'><i className='fa-solid fa-circle-plus'></i> Añadir</Link>
                  </CardTitle>
                    <Table responsive bordered striped>
                      <thead>
                        <tr><th>#</th><th>NOMBRE</th><th>CORREO</th><th>ROL</th><th>CONTRASEÑA</th><th></th><th></th></tr>
                      </thead>
                      <tbody className='table-group-divider'>
                      { usuarios.map( (row,i)=>(
                        <tr key={row._id}>
                          <td>{ (i+1) }</td>
                          <td>{ row.nombre}</td>
                          <td>{ row.correo}</td>
                          <td>{ row.rol}</td>
                          <td>{ row.password}</td>
                          <td>
                            <Link to={'/editar-usuario/'+row._id} className='btn btn-warning'><i className='fa-solid fa-edit'></i></Link>
                          </td>
                          <td><Button color='danger' onClick={()=> eliminarUsuario(row._id,row.nombre)}>
                            <i className='fa-solid fa-trash'></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
              </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default IndexUsuarios