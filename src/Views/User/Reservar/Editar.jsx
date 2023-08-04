import React from 'react'
import {useParams} from 'react-router-dom'
import {Container,Row,Col,Table,Card,CardBody,CardTitle,Button,CardText,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import {useState,useEffect} from 'react'
import {enviarPeticion} from '../../../funciones'

const EditarReserva = () => {
    const {id} = useParams();
    useEffect(()=>{
        obtenerReservas();
    },[]);
    const [espacio,setEspacio] = useState([]);
    const [espacioId,setEspacioId] = useState([]);
    const [fecha,setFecha] = useState('');
    const [descripcion,setDescripcion] = useState('');
    const obtenerReservas = async() =>{
      const res = await enviarPeticion('GET','',('/reservas/'+id),'',true);
      setEspacio(res.data.espacio);
      setEspacioId(res.data.espacio_id);
      setFecha(res.data.fecha);
      setDescripcion(res.data.descripcion);
    }
    const guardar = async(e) =>{
      e.preventDefault();
      await enviarPeticion('PUT',{espacio:espacio,espacio_id:espacioId,fecha:fecha,descripcion:descripcion},('/reservas/'+id),('/mis-reservaciones'),true);
    }
  return (
    <Container>
      <Row>
        <Col>
          <Card className='mt-5 bg-white mt-3 shadow text-center'>
            <CardBody>
            <CardTitle className='h3 text-center'>{ espacio }</CardTitle>
            <Row>
                <Col sm='12'>
                    <CardText className='text-justificado'>Modificar la reservación de <b>{ espacio }</b></CardText>
                    <CardText className='text-start'>Fecha:</CardText>
                    <Form onSubmit={guardar}>
                        <InputGroup>
                            <InputGroupText><i className='fa-solid fa-calendar-day'></i></InputGroupText>
                            <Input type="date" value={fecha.substring(0, 10)} onChange={(e) => setFecha(e.target.value)} required />
                        </InputGroup>
                        <InputGroup className='mt-3'>
                            <InputGroupText><i className='fa-solid fa-comments'></i></InputGroupText>
                            <Input value={descripcion} placeholder='Descripción' onChange={(e) => setDescripcion(e.target.value)} required />
                        </InputGroup>
                        <p className='text-center mt-3'><Button color='dark'><i className='fa-solid fa-save'></i> Guardar</Button></p>
                    </Form>
                </Col>
            </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default EditarReserva