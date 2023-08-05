/* eslint-disable no-undef */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Login from './Views/Public/Login'
import Register from './Views/Public/Register'
import {ProtectedRoutes,ProtectedRoutesAdmin} from './Components/ProtectedRoutes'
import IndexUsuarios from './Views/Admin/Usuarios/Index'
import CrearUsuario from './Views/Admin/Usuarios/Crear'
import EditarUsuario from './Views/Admin/Usuarios/Editar'
import IndexEspacios from './Views/Admin/Espacios/Index'
import CrearEspacio from './Views/Admin/Espacios/Crear'
import EditarEspacio from './Views/Admin/Espacios/Editar'
import IndexReservar from './Views/User/Reservar/Index'
import CrearReserva from './Views/User/Reservar/Crear'
import EditarReserva from './Views/User/Reservar/Editar'
import Reservaciones from './Views/User/Reservar/Reservaciones'
import IndexReservaciones from './Views/Admin/Reservaciones/Index'
import IndexEncuestas from './Views/Admin/Encuestas/Index'
import CrearEncuesta from './Views/Admin/Encuestas/Crear'
import EditarEncuesta from './Views/Admin/Encuestas/Editar'
import Respuestas from './Views/Admin/Encuestas/Respuestas'
import Preguntas from './Views/Admin/Encuestas/Preguntas'
import Aplicar from './Views/User/Encuestas/Aplicar'
import Survey from './Views/User/Encuestas/Survey'
import IndexMaps from './Views/User/Mapas/index'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<IndexReservar />} />
          <Route path="/reservar/:id" element={<CrearReserva />} />
          <Route path="/mis-reservaciones" element={<Reservaciones />} />
          <Route path="/editar-reserva/:id" element={<EditarReserva />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/survey/:id" element={<Aplicar />} />
          <Route path="/mapas" element={<IndexMaps />} />
        </Route>
        <Route element={<ProtectedRoutesAdmin />}>
          <Route path="/usuarios" element={<IndexUsuarios />} />
          <Route path="/crear-usuario" element={<CrearUsuario />} />
          <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
          <Route path="/espacios" element={<IndexEspacios />} />
          <Route path="/crear-espacio" element={<CrearEspacio />} />
          <Route path="/editar-espacio/:id" element={<EditarEspacio />} />
          <Route path="/reservaciones" element={<IndexReservaciones />} />
          <Route path="/encuestas" element={<IndexEncuestas />} />
          <Route path="/crear-encuesta" element={<CrearEncuesta />} />
          <Route path="/editar-encuesta/:id" element={<EditarEncuesta />} />
          <Route path="/respuestas/:id" element={<Respuestas />} />
          <Route path="/preguntas/:id" element={<Preguntas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
