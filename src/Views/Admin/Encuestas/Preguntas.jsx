import React from 'react'
import { useParams } from 'react-router-dom'
import {Container,Row,Col,Table,Card,CardBody,CardTitle,CardText,InputGroup,InputGroupText,Input,Button} from 'reactstrap'
import {useState,useEffect} from 'react'
import {enviarPeticion} from '../../../funciones'
const Preguntas = () => {
    useEffect(()=>{
        obtenerPreguntas();
      },[]);
      const {id} = useParams();
      const [preguntas,setPreguntas] = useState([]);
      const [arrayPreg,setArrayPreg] = useState([]);
      const [nombre,setNombre] = useState('');
      const [nueva,setNueva] = useState('');
      const [total,setTotal] = useState(0);
      const obtenerPreguntas = async() =>{
        const res = await enviarPeticion('GET','',('/encuestas/'+id),'',true);
        setPreguntas(res.data.preguntas);
        setNombre(res.data.nombre);
        llenaArray(res.data.preguntas);
        setTotal(res.data.preguntas.length);
      }
      const llenaArray = (preg) =>{
        preg.map( (row,i)=>(
            arrayPreg.push(row)
        ));
      }
      const actualiza = (indice,valor) =>{
        const temp = arrayPreg.map((c, i) => {
          if (i === indice) {
            return valor;
          }
          else {
            return c;
          }
        });
        setArrayPreg(temp);
      }
      const guardar = async(metodo) =>{
        let actualizadas =[];
        for(let i=0;i<total;i++){
          actualizadas.push(arrayPreg[i]);
        }
        let url = (metodo =='POST') ? '/preguntas' : '/preguntas/'+id;
        let pregunta = (metodo =='POST') ? nueva : actualizadas;
        await enviarPeticion(metodo,{pregunta:pregunta,encuesta:id},url,('/preguntas/'+id),true);
      }
      const eliminarPregunta = async(idP,nombre) =>{
        let actualizadas =[];
        for(let i=0;i<total;i++){
          actualizadas.push(arrayPreg[i]);
        }
        actualizadas.splice(idP,1);
        await enviarPeticion('PUT',{pregunta:actualizadas,encuesta:id},('/preguntas/'+id),('/preguntas/'+id),true);
      }
  return (
    <Container>
      <Row className='mt-5 mb-3'>
        <Col>
          <Card className='mt-5 border border-warning bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle>
                    <CardText className='h5 mb-3'>Preguntas de la encuesta <b>{nombre}</b></CardText>
                    <Row className='mt-3 mb-3'>
                        <Col sm={{offset: 2,size: 6}}>
                        <InputGroup>
                            <InputGroupText><i className='fa-solid fa-circle-question'></i></InputGroupText>
                            <Input value={nueva} placeholder="Agregar pregunta"  onChange={(e) => setNueva(e.target.value)} required />
                        </InputGroup>
                        </Col>
                        <Col sm={{size: 2}}>
                        <Button color='success' onClick={()=> guardar('POST')}>
                            <i className='fa-solid fa-save'></i> Guardar
                        </Button></Col>
                    </Row>
                    <Row className='mb-3 border-bottom'></Row>
                  </CardTitle>
                    <Table responsive bordered striped>
                      <thead>
                        <tr><th>#</th><th>PREGUNTA</th><th></th><th></th></tr>
                      </thead>
                      <tbody className='table-group-divider'>
                      { preguntas.map( (row,i)=>(
                        <tr key={i}>
                          <td>{ (i+1) }</td>
                          <td><Input type='text' value={arrayPreg[i]} onChange={(e) => actualiza(i,e.target.value)}></Input></td>
                          <td>
                            <Button color='success' onClick={()=> guardar('PUT')}>
                              <i className='fa-solid fa-save'></i>
                            </Button>
                          </td>
                          <td>
                            <Button color='danger' onClick={()=> eliminarPregunta(i,row)}>
                              <i className='fa-solid fa-trash'></i>
                            </Button>
                          </td>
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

export default Preguntas