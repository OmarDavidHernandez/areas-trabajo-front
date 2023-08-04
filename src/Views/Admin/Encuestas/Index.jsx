import React from 'react'
import {Link} from 'react-router-dom'
import {Container,Row,Col,Table,Card,CardBody,CardTitle,Button,CardText} from 'reactstrap'
import {useState,useEffect} from 'react'
import {confirmacion,enviarPeticion} from '../../../funciones'

const IndexEncuestas = () => {
    useEffect(()=>{
        obtenerEncuestas();
      },[]);
      const [encuestas,setencuestas] = useState([]);
      const obtenerEncuestas = async() =>{
        const res = await enviarPeticion('GET','','/encuestas','',true);
        setencuestas(res.data);
      }
      const eliminarEncuesta = (id,nombre) =>{
        confirmacion(nombre,('/encuestas/'+id),'/encuestas','',true);
      }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className='mt-5 border border-warning bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle><CardText className='h4'>Encuestas</CardText>
                    <Link to={'/crear-encuesta'} className='btn btn-dark'><i className='fa-solid fa-circle-plus'></i> Crear</Link>
                  </CardTitle>
                    <Table responsive bordered striped>
                      <thead>
                        <tr><th>#</th><th>ENCUESTA</th><th>PREGUNTAS</th><th>RESPUESTAS</th><th></th><th></th></tr>
                      </thead>
                      <tbody className='table-group-divider'>
                      { encuestas.map( (row,i)=>(
                        <tr key={row._id}>
                          <td>{ (i+1) }</td>
                          <td>{ row.nombre}</td>
                          <td>
                            <Link to={'/preguntas/'+row._id} className='btn btn-primary'><i className='fa-solid fa-circle-question'></i></Link>
                          </td>
                          <td>
                            <Link to={'/respuestas/'+row._id} className='btn btn-success'><i className='fa-solid fa-person-circle-question'></i></Link>
                          </td>
                          <td>
                            <Link to={'/editar-encuesta/'+row._id} className='btn btn-warning'><i className='fa-solid fa-edit'></i></Link>
                          </td>
                          <td><Button color='danger' onClick={()=> eliminarEncuesta(row._id,row.nombre)}>
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

export default IndexEncuestas