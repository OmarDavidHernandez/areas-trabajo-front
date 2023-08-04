import React from 'react'
import {Link} from 'react-router-dom'
import {Container,Row,Col,Card,CardBody,CardTitle,ListGroupItem,ListGroup} from 'reactstrap'
import {useState,useEffect} from 'react'
import {enviarPeticion} from '../../../funciones'

const Survey = () => {
    useEffect(()=>{
        obtenerEncuestas();
      },[]);
      const [encuestas,setencuestas] = useState([]);
      const [conPreg,setconPreg] = useState([]);
      const obtenerEncuestas = async() =>{
        const res = await enviarPeticion('GET','','/encuestas','',true);
        setencuestas(res.data);
        verificar(res.data);
      }
      const verificar = (enc) =>{
        let temp = [];
        enc.forEach((en,i) => {
          if(en.preguntas.length > 0){
            temp.push({nombre:en.nombre,_id:en._id});
          }
        });
        setconPreg(temp);
        console.log(temp);
      }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className='border border-warning mt-5 bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle className='h4'>
                  ¡Gracias por ayudarnos a mejorar! 
                  Estas son nuestras encuestas disponibles
                  </CardTitle>
                  <ListGroup>
                    { conPreg.map( (row,i)=>(
                      <ListGroupItem key={row._id}>
                        <Link to={'/survey/'+row._id}> { row.nombre}</Link>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
              </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Survey