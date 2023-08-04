import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion,obtenerUrl } from '../../../funciones'

const IndexReservar = () => {
  useEffect(()=>{
    obtenerEspacios();
  },[]);
  const [espacios,setEspacios] = useState([]);
  const [filtro,setFiltro] = useState('');
  const [temporal,setTemporal] = useState([]);
  const obtenerEspacios = async() =>{
    const res = await enviarPeticion('GET','','/espacios','',true);
    setEspacios(res.data);
    setTemporal(res.data); 
  }
  const buscar = (e) =>{
    if(filtro != ''){
        setTemporal(espacios.filter(p => p.nombre == filtro));
    }
    else{
      setTemporal(espacios);
    }
  }
  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className='mt-5 mb-3'>
            <InputGroupText><i className='fa-solid fa-search'></i></InputGroupText>
            <Input type="text" placeholder="Buscar espacio" value={filtro} onChange={(e) =>{setFiltro(e.target.value)}} onKeyUpCapture={buscar}/>
          </InputGroup>
        </Col>
      </Row>
      <Row>
      { temporal.map( (row)=>(
        <Col sm='6' md='6' lg='4' xxl='3' className='mb-3' key={row._id}>
        <Card className='bg-light border border-warning shadow card-hover'>
          <div className='text-center'>
            <img className='rounded mt-2' src={obtenerUrl()+row.imagen} width="280px" height='220px'></img>
          </div>
            <CardBody>
                <CardTitle className='h4 text-center mb-1'>{row.nombre}</CardTitle>
                <CardTitle className='h5 text-center mb-3'>Para <b>{row.capacidad}</b> personas</CardTitle>
                <CardText className='text-center'>
                    <Link to={'/reservar/'+row._id} className='btn btn-warning mb-3'>Reservar <i className="fa-solid fa-hand-point-up"></i></Link>
                </CardText>
            </CardBody>
        </Card>
        </Col>
        ))}
      </Row>
    </Container>
  )
}

export default IndexReservar