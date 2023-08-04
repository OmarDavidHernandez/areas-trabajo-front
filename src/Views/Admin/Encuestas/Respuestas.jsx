import React from 'react'
import { useParams } from 'react-router-dom'
import {Container,Row,Col,Table,Card,CardBody,CardTitle, CardText} from 'reactstrap'
import {useState,useEffect} from 'react'
import {enviarPeticion} from '../../../funciones'
const Respuestas = () => {
    useEffect(()=>{
        obtenerRespuestas();
      },[]);
      const {id} = useParams();
      const [preguntas,setPreguntas] = useState([]);
      const [listado,setListado] = useState([]);
      const [nombre,setNombre] = useState('');
      const obtenerRespuestas = async() =>{
        const res = await enviarPeticion('GET','',('/encuestas/'+id),'',true);
        setNombre(res.data.nombre);
        setPreguntas(res.data.preguntas);
        procesaRespuestas(res.data.preguntas,res.data.respuestas);
      }
      const procesaRespuestas = (preg,resp) =>{
        let nuevo = [];
        preg.forEach((p,pi) => {
          let suma = 0;
          let cont = 0;
          resp.forEach((r,pr) => {
            if(pi == r.pregunta){
              suma += parseInt(r.respuesta);
              cont++;
            }
          });
          nuevo.push({pregunta:p,promedio:(suma/cont)});
        });
        setListado(nuevo);
      }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className='mt-5 border border-warning bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle>
                    <CardText className='h5 mb-3'>Resultados de la encuesta <b>{nombre}</b></CardText>
                  </CardTitle>
                    <Table responsive bordered striped>
                      <thead>
                        <tr><th>#</th><th>PREGUNTA</th><th>PROMEDIO CALIFICACIÓN</th></tr>
                      </thead>
                      <tbody className='table-group-divider'>
                      { preguntas.map( (row,i)=>(
                        <tr key={i}>
                          <td>{ (i+1) }</td>
                          <td>{ row}</td>
                          <td>{ (isNaN(listado[i].promedio) ? '0' : listado[i].promedio)}</td>
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

export default Respuestas