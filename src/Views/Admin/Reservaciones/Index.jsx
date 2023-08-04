import React from 'react'
import {Link} from 'react-router-dom'
import {Container,Row,Col,Table,Card,CardBody,CardTitle,Button} from 'reactstrap'
import {useState,useEffect} from 'react'
import {confirmacion,enviarPeticion} from '../../../funciones'
import Storage from '../../../Components/Storage';

const IndexReservaciones = () => {
    useEffect(()=>{
        obtenerReservas();
    },[]);
    const [reservas,setReservas] = useState([]);
    const obtenerReservas = async() =>{
      const res = await enviarPeticion('GET','','/reservas/','',true);
      setReservas(res.data);
    }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className='mt-5 border border-warning bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle className='h4 mb-3'>Espacios reservados</CardTitle>
                    <Table responsive bordered striped>
                      <thead>
                        <tr><th>#</th><th>USUARIO</th><th>ESPACIO</th><th>FECHA</th><th>DESCRIPCIÓN</th></tr>
                      </thead>
                      <tbody className='table-group-divider'>
                      { reservas.map( (row,i)=>(
                        <tr key={row._id}>
                          <td>{ (i+1) }</td>
                          <td>{ row.usuario}</td>
                          <td>{ row.espacio}</td>
                          <td>{ row.fecha.substring(0, 10)}</td>
                          <td>{ row.descripcion}</td>
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

export default IndexReservaciones