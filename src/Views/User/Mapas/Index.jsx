import GoogleMapReact from 'google-map-react';
import { useEffect,useState } from 'react';
import {Container,Row,Col,Card,CardBody,CardTitle} from 'reactstrap'
const IndexMaps = () => {
  const [miLatitud,setMiLatitud] = useState(0);
  const [miLongitud,setMiLongitud] = useState(0);
  useEffect(() =>{
    getUbicacion();
  },[]);
  const getUbicacion = async() =>{
    return new Promise( (resolve, reject) =>{
      navigator.geolocation.getCurrentPosition(({coords}) => {
        resolve([ coords.longitude, coords.latitude])
        setMiLatitud(coords.latitude);
        setMiLongitud(coords.longitude);
      },
      (err) => {
        alert('No se pudo obtener geolocalización');
        console.log(err);
        reject();
      });
    });  
  }
  const Punto = ({ text,fondo }) => (
    <div style={{
      color: 'black', background: fondo, padding: '15px 10px', display: 'inline-flex',
      textAlign: 'center', alignItems: 'center', justifyContent: 'center',
      borderRadius: '100%',transform: 'translate(-50%, -50%)'
    }}> {text} </div>
  );
  if(miLatitud !== 0 && miLongitud !== 0){
    return (
      <Container>
        <Row className='mt-5'>
          <Col>
            <Card className='border border-warning mt-5 bg-white mt-3 shadow text-center'>
              <CardBody>
              <CardTitle className='h4 mb-3'>Mapas</CardTitle>
                <div style={{ height: '500px', width: '100%' }}>
                  <GoogleMapReact bootstrapURLKeys={{ key: '' }}
                    defaultCenter={{lat: miLatitud, lng: miLongitud}}
                    defaultZoom={11} >
                      <Punto 
                        lat={9.24779} 
                        lng={-70.653254} 
                        text={'El Hatico'}
                        fondo={'yellow'} 
                      />
                      <Punto 
                        lat={9.287799} 
                        lng={-70.624791} 
                        text={'El Country'}
                        fondo={'yellow'} 
                      />
                      <Punto 
                        lat={9.312639} 
                        lng={-70.606116} 
                        text={'Av.6'}
                        fondo={'yellow'} 
                      />
                      <Punto 
                        lat={miLatitud} 
                        lng={miLongitud} 
                        text={'Yo'}
                        fondo={'red'} 
                      />
                  </GoogleMapReact>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  
}
export default IndexMaps