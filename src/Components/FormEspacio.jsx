import React,{useEffect,useState} from 'react'
import {Container,Row,Col,Card,CardBody,CardTitle,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion,obtenerUrl } from '../funciones'

const FormEspacio = (parametros) => {
    const [nombre,setNombre] = useState('');
    const [capacidad,setCapacidad] = useState('');
    const [imagen,setImagen] = useState('');
    const [ubicacion,setUbicacion] = useState('');
    const [srcImg,setSrcImg] = useState('/img/default.png');
    const [requerida,setRequerida] = useState(true);
    let metodo = 'POST';
    let url = '/espacios';
    
    useEffect( () =>{
        obtenerEspacio();
    },[]);
    const obtenerEspacio = async() =>{
        if(parametros.id !== null){
            const res = await enviarPeticion('GET','',(url+'/'+parametros.id),'',true);
            setNombre(res.data.nombre);
            setCapacidad(res.data.capacidad);
            setUbicacion(res.data.ubicacion);
            setImagen(obtenerUrl()+res.data.imagen);
            setSrcImg(obtenerUrl()+res.data.imagen);
            setRequerida(false);
        }
    }
    const ver = (e) =>{
        setImagen(e.files[0]);
        setSrcImg(URL.createObjectURL(e.files[0]));
    }
    const guardar = async(e) =>{
        e.preventDefault();
        if(parametros.id !== null){
            metodo= 'PUT';
            url = '/espacios/'+parametros.id;
        }
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('capacidad', capacidad);
        formData.append('ubicacion', ubicacion);
        if(imagen != ''){
            formData.append('imagen', imagen);
        }
        await enviarPeticion(metodo,formData,url,'/espacios',true);
    }
  return (
    <Container>
      <Row>
        <Col>
        <Card className='mt-5 bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle className=''>
                  <p className='h3 text-center'>{ parametros.titulo}</p>
                  </CardTitle>
                    <Row>
                        <Col md='9'>
                        <Form onSubmit={guardar}>
                            <InputGroup className='mt-5 mb-3'>
                                <InputGroupText><i className='fa-solid fa-building'></i></InputGroupText>
                                <Input value={nombre} placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-hashtag'></i></InputGroupText>
                                <Input value={capacidad} placeholder="Capacidad" type='number' onChange={(e) => setCapacidad(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-location-dot'></i></InputGroupText>
                                <Input value={ubicacion} placeholder="Ubicación" onChange={(e) => setUbicacion(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-image'></i></InputGroupText>
                                <Input type='file' accept="image/png,image/jpeg" onChange={(e) => ver(e.target)} required={requerida} />
                            </InputGroup>
                            <p className='text-center mt-3'><Button color='dark'><i className='fa-solid fa-save'></i> Guardar</Button></p>
                        </Form>
                        </Col>
                        <Col md='3'>
                            <img className='shadow mt-md-5 img-fluid' src={srcImg} height='200px'></img>
                        </Col>
                    </Row>
              </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default FormEspacio