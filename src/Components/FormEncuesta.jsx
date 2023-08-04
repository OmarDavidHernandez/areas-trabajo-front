import React,{useEffect,useState} from 'react'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion } from '../funciones'

const FormEncuesta = (parametros) => {
  const [nombre,setNombre] = useState('');
  let metodo = 'POST';
  let url = '/encuestas';
  useEffect( () =>{
    obtenerEncuesta();
  },[]);
    const obtenerEncuesta = async() =>{
        if(parametros.id !== null){
            const res = await enviarPeticion('GET','',(url+'/'+parametros.id),'',true);
            setNombre(res.data.nombre);
        }
    }
    const guardar = async(e) =>{
        e.preventDefault();
        if(parametros.id !== null){
            metodo= 'PUT';
            url = '/encuestas/'+parametros.id;
        }
        await enviarPeticion(metodo,{nombre:nombre},url,'/encuestas',true);
        
    }
  return (
    <Container>
      <Row>
        <Col>
        <Card className='bg-white border-warning mt-5 shadow text-center'>
              <CardBody>
                  <CardTitle className=''>
                  <p className='h3 text-center'>{ parametros.titulo}</p>
                  </CardTitle>
                    <Row>
                        <Col md='12'>
                        <Form onSubmit={guardar}>
                            <InputGroup className='mt-5 mb-3'>
                                <InputGroupText><i className='fa-solid fa-clipboard-question'></i></InputGroupText>
                                <Input value={nombre} placeholder="Encuesta"  onChange={(e) => setNombre(e.target.value)} required />
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

export default FormEncuesta