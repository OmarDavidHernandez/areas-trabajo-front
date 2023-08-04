import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion,obtenerUrl } from '../../../funciones'
import Storage from '../../../Components/Storage';

const CrearReserva = () => {
  const {id} = useParams();
  const [nombre,setNombre] = useState('');
  const [capacidad,setCapacidad] = useState('');
  const [imagen,setImagen] = useState('');
  const [fecha,setFecha] = useState('');
  const [descripcion,setDescripcion] = useState('');
  useEffect(()=>{
    obtenerEspacios();
  },[]);
  const obtenerEspacios = async() =>{
    const res = await enviarPeticion('GET','',('/espacios/'+id),'',true);
    setNombre(res.data.nombre);
    setCapacidad(res.data.capacidad); 
    setImagen(obtenerUrl()+res.data.imagen);
  }
  const guardar = async(e) =>{
    e.preventDefault();
    await enviarPeticion('POST',{espacio:nombre,espacio_id:id,usuario:Storage.get('authUser').nombre,usuario_id:Storage.get('authUser').id,fecha:fecha,descripcion:descripcion},'/reservas',('/mis-reservaciones'),true);
  }
  return (
    <Container>
      <Row>
        <Col>
          <Card className='mt-5 bg-white mt-3 shadow text-center'>
            <CardBody>
            <CardTitle className='h3 text-center'>
            { nombre}
            </CardTitle>
            <Row>
                <Col sm='5' lg='6'>
                    <CardText className='text-justificado'>Espacio: <b>{ nombre }</b></CardText>
                    <CardText className='text-start'>Capacidad: <b>{ capacidad }</b> personas como máximo</CardText>
                    <CardText className='text-start'>Fecha de reservación:</CardText>
                    <Form onSubmit={guardar}>
                        <InputGroup>
                            <InputGroupText><i className='fa-solid fa-calendar-day'></i></InputGroupText>
                            <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                        </InputGroup>
                        <InputGroup className='mt-3'>
                            <InputGroupText><i className='fa-solid fa-comments'></i></InputGroupText>
                            <Input value={descripcion} placeholder='Descripción' onChange={(e) => setDescripcion(e.target.value)} required />
                        </InputGroup>
                        <p className='text-center mt-3'><Button color='dark'><i className='fa-solid fa-save'></i> Guardar</Button></p>
                    </Form>
                </Col>
                <Col sm='7' lg='6'>
                    <img className='shadow mt-3 mt-md-0' src={imagen} width='350px' height='200px'></img>
                </Col>
            </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CrearReserva