import React from 'react'
import {Link} from 'react-router-dom'
import {Container,Row,Col,Table,Card,CardBody,CardTitle,Button} from 'reactstrap'
import {useState,useEffect} from 'react'
import {confirmacion,enviarPeticion} from '../../../funciones'
import Storage from '../../../Components/Storage';

const Reservaciones = () => {
    useEffect(()=>{
        obtenerReservas();
    },[]);
    const [reservas,setReservas] = useState([]);
    const obtenerReservas = async() =>{
      const res = await enviarPeticion('GET','',('/reservas-usuario/'+Storage.get('authUser').id),'',true);
      setReservas(res.data);
    }
    const eliminarReserva = (id,nombre) =>{
        confirmacion(nombre,('/reservas/'+id),'/mis-reservaciones/','',true);
      }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className='mt-5 border border-warning bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle className='h4 mb-3'>Mis reservaciones</CardTitle>
                    <Table responsive bordered striped>
                      <thead>
                        <tr><th>#</th><th>ESPACIO</th><th>FECHA</th><th>DESCRIPCIÓN</th><th></th><th></th></tr>
                      </thead>
                      <tbody className='table-group-divider'>
                      { reservas.map( (row,i)=>(
                        <tr key={row._id}>
                          <td>{ (i+1) }</td>
                          <td>{ row.espacio}</td>
                          <td>{ row.fecha.substring(0, 10)}</td>
                          <td>{ row.descripcion}</td>
                          <td>
                            <Link to={'/editar-reserva/'+row._id} className='btn btn-warning'><i className='fa-solid fa-edit'></i></Link>
                          </td>
                          <td><Button color='danger' onClick={()=> eliminarReserva(row._id,row.espacio)}>
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

export default Reservaciones