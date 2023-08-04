import React from 'react'
import {Link} from 'react-router-dom'
import {Container,Row,Col,Table,Card,CardBody,CardTitle,Button,CardText} from 'reactstrap'
import {useState,useEffect} from 'react'
import {confirmacion,enviarPeticion,obtenerUrl} from '../../../funciones'

const IndexEspacios = () => {
    useEffect(()=>{
        obtenerEspacios();
    },[]);
    const [espacios,setEspacios] = useState([]);
    const obtenerEspacios = async() =>{
      const res = await enviarPeticion('GET','','/espacios/','',true);
      setEspacios(res.data);
    }
    const eliminarEspacio = (id,nombre) =>{
      confirmacion(nombre,('/espacios/'+id),'/espacios','',true);
    }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className='mt-5 border border-warning bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle><CardText className='h4'>Espacios</CardText>
                    <Link to={'/crear-espacio'} className='btn btn-dark'><i className='fa-solid fa-circle-plus'></i> Crear</Link>
                  </CardTitle>
                    <Table responsive bordered striped>
                      <thead>
                        <tr><th>#</th><th>NOMBRE</th><th>CAPACIDAD</th><th>UBICACION</th><th>IMAGEN</th><th></th><th></th></tr>
                      </thead>
                      <tbody className='table-group-divider'>
                      { espacios.map( (row,i)=>(
                        <tr key={row._id}>
                          <td>{ (i+1) }</td>
                          <td>{ row.nombre}</td>
                          <td>{ row.capacidad} personas</td>
                          <td>{ row.ubicacion}</td>
                          <td><img src={obtenerUrl()+row.imagen} height='80px' /></td>
                          <td>
                            <Link to={'/editar-espacio/'+row._id} className='btn btn-warning'><i className='fa-solid fa-edit'></i></Link>
                          </td>
                          <td><Button color='danger' onClick={()=> eliminarEspacio(row._id,row.nombre)}>
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

export default IndexEspacios