import React,{useEffect,useState} from 'react'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion } from '../funciones'

const FormUsuario = (parametros) => {
  const [nombre,setNombre] = useState('');
  const [correo,setCorreo] = useState('');
  const [password,setPassword] = useState('');
  const [rol,setRol] = useState('');
  let metodo = 'POST';
  let url = '/usuarios';
  useEffect( () =>{
    obtenerUsuario();
  },[]);
    const obtenerUsuario = async() =>{
        if(parametros.id !== null){
            const res = await enviarPeticion('GET','',(url+'/'+parametros.id),'',true);
            setNombre(res.data.nombre);
            setCorreo(res.data.correo);
            setRol(res.data.rol);
        }
    }
    const guardar = async(e) =>{
        e.preventDefault();
        if(parametros.id !== null){
            metodo= 'PUT';
            url = '/usuarios/'+parametros.id;
        }
        await enviarPeticion(metodo,{nombre:nombre,correo:correo,rol:rol,password:password},url,'/usuarios',true);
        
    }
  return (
    <Container>
      <Row>
        <Col>
          <Card className='bg-white mt-5 shadow text-center'>
            <CardBody>
                <CardTitle className=''>
                <p className='h3 text-center'>{ parametros.titulo}</p>
                </CardTitle>
                  <Row>
                    <Col md='12'>
                      <Form onSubmit={guardar}>
                          <InputGroup className='mt-5 mb-3'>
                            <InputGroupText><i className='fa-solid fa-user'></i></InputGroupText>
                            <Input value={nombre} placeholder="Nombre"  onChange={(e) => setNombre(e.target.value)} required />
                          </InputGroup>
                          <InputGroup className='mt-3 mb-3'>
                            <InputGroupText><i className='fa-solid fa-at'></i></InputGroupText>
                            <Input type="email" value={correo} placeholder="Correo"  onChange={(e) => setCorreo(e.target.value)} required />
                          </InputGroup>
                          <InputGroup className='mt-3 mb-3'>
                            <InputGroupText><i className='fa-solid fa-lock'></i></InputGroupText>
                            <Input type="select" value={rol} placeholder="Rol"  onChange={(e) => setRol(e.target.value)} required >
                            <option value="">Rol</option>
                            <option value="admin">Admin</option>
                            <option value="user">Usuario</option>
                            </Input>
                          </InputGroup>
                          <InputGroup className='mt-3 mb-3'>
                            <InputGroupText><i className='fa-solid fa-key'></i></InputGroupText>
                            <Input value={password} placeholder="Contraseña"  onChange={(e) => setPassword(e.target.value)} required />
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

export default FormUsuario