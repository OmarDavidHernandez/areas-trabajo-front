import React,{useState} from 'react'
import {Container,Row,Col,Card,CardHeader,CardBody,CardText,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { enviarPeticion } from '../../funciones';
const Register = () => {
  const [nombre,setNombre] = useState('');
  const [correo,setCorreo] = useState('');
  const [password,setPassword] = useState('');
  const ir = useNavigate();
  const validar = async(e) =>{
    e.preventDefault();
    const form = {correo:correo,nombre:nombre,rol:'user',password:password};
    const res = await enviarPeticion('POST',form,'/usuarios','');
    if(res.status == true){
      ir('/login');
    }
  }
  return (
    <Container className='mb-5'>
      <Row className='mb-5'>
        <Col lg={{ offset: 2,size: 8}} md={{ offset: 1,size: 10}} className='mb-5'>
        <Card className='border border-warning shadow mt-5 mb-5'>
          <CardHeader className='bg-warning border-bottom border-dark text-dark text-center h3 border-bottom border-light'>Registro </CardHeader>
          <CardBody className=''>
              <Form onSubmit={validar}>
                <InputGroup className='mt-3 mb-3'>
                  <InputGroupText><i className='fa-solid fa-user'></i></InputGroupText>
                  <Input value={nombre} onChange={(e) => setNombre(e.target.value)}  placeholder="Nombre" required />
                </InputGroup>
                <InputGroup className='mt-3 mb-3'>
                  <InputGroupText><i className='fa-solid fa-at'></i></InputGroupText>
                  <Input type='email' value={correo} onChange={(e) => setCorreo(e.target.value)}  placeholder="Correo" required />
                </InputGroup>
                <InputGroup className='mt-3 mb-3'>
                  <InputGroupText><i className='fa-solid fa-key'></i></InputGroupText>
                  <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Contraseña" required />
                </InputGroup>
                <CardText className='text-center'>
                  <Button color='dark' className='mb-3'>
                  <i className="fa-solid fa-save"></i> Registrar</Button>
              </CardText>
              </Form>
          </CardBody>
        </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Register