import { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { Navbar,Nav,NavLink,NavbarBrand,NavbarToggler,NavbarText,Collapse,NavItem, Button } from 'reactstrap'
import Storage from './Storage';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const ir = useNavigate();
  const salir = () =>{
    Storage.remove('authToken');
    Storage.remove('authUser');
    ir('/login');
  }
  return (
    <header className='mb-5'>
      <Navbar expand="lg" fixed="top" color='warning' dark={true}>
        <NavbarBrand href="/">WorkSpace</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          </Nav>
          { (Storage.get('authUser') && Storage.get('authUser').rol == 'admin' ) ? (
            <>
            <NavLink href="/reservaciones" className='text-dark h3 me-md-5'>
              Reservaciones
            </NavLink>
            <NavLink href="/usuarios" className='text-dark h3 me-md-5'>
              Usuarios
            </NavLink>
            <NavLink href="/espacios" className='text-dark h3 me-md-5'>
              Espacios
            </NavLink>
            <NavLink href="/encuestas" className='text-dark h3 me-md-5'>
              Encuestas
            </NavLink>
            <NavLink className='text-dark h3 me-md-5'>
              <b>{Storage.get('authUser').nombre}</b>
            </NavLink>
            <NavbarText>
              <Button color='blue text-dark' onClick={salir}>Salir</Button>
            </NavbarText>
            </>
            ) : 
            (Storage.get('authUser') && Storage.get('authUser').rol == 'user' ) ? (
              <>
              <NavLink href="/mapas" className='text-dark h3 me-md-5'>
                Mapa
              </NavLink>
              <NavLink href="/mis-reservaciones" className='text-dark h3 me-md-5'>
                Mis reservaciones
              </NavLink>
              <NavLink href="/survey" className='text-dark h3 me-md-5'>
                Encuestas
              </NavLink>
              <NavLink className='text-dark h3 me-md-5'>
                <b>{Storage.get('authUser').nombre}</b>
              </NavLink>
              <NavbarText>
                <Button color='blue text-dark' onClick={salir}>Salir</Button>
              </NavbarText>
              </>
            ) : <NavLink href="/register" className='text-dark h3 me-md-5'>
            Registro
          </NavLink>}
        </Collapse>
      </Navbar>
    </header>
  )
}

export default NavBar