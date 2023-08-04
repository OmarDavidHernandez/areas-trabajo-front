import React from 'react'
import { useParams } from 'react-router-dom'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,Form,Input,Button} from 'reactstrap'
import {useState,useEffect} from 'react'
import {enviarPeticion} from '../../../funciones'

const Aplicar = () => {
    const {id} = useParams();
    useEffect(()=>{
        obtenerPreguntas();
      },[]);
      const [preguntas,setPreguntas] = useState([]);
      const [arrayResp,setArrayResp] = useState([]);
      const [nombre,setNombre] = useState('');
      const obtenerPreguntas = async() =>{
        const res = await enviarPeticion('GET','',('/encuestas/'+id),'',true);
        llenaArray(res.data.preguntas);
        setPreguntas(res.data.preguntas);
        setNombre(res.data.nombre);
      }
      const llenaArray = (preg) =>{
        let temp = [];
        preg.forEach(p => {
          temp.push('')
        });
        setArrayResp(temp);
      }
      const actualiza = (indice,valor) =>{
        const temp = arrayResp.map((c, i) => {
          if (i === indice) {
            return valor;
          }
          else {
            return c;
          }
        });
        setArrayResp(temp);
        console.log(arrayResp);
      }
      const guardar = async(e) =>{
        e.preventDefault();
        await enviarPeticion('POST',{respuestas:arrayResp,encuesta:id},'/respuestas','/',true);
      }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className='border border-warning mt-5 bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle className='h4'>
                  <CardText className='h5 mb-3'>Encuesta <b>{nombre}</b></CardText>
                  <CardText className='h5 mb-3'>Responde del 1 al 5 en donde 1 es la calificación más baja y 5 la calificación más alta.</CardText>
                  </CardTitle>
                    <Form onSubmit={guardar}>
                    { preguntas.map( (row,i)=>(
                      <Row key={i}>
                        <Col xs='8'>
                        {(i+1)}.- {row}
                        </Col>
                        <Col xs='2'>
                        <Input value={arrayResp[i]} onChange={(e) => actualiza(i,e.target.value)} type='number' step='1' min='1' max='5' required/>
                        </Col>
                      </Row>
                    ))}
                    <Button color='dark'><i className="fa-solid fa-paper-plane"></i> Enviar</Button>
                    </Form>
              </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Aplicar