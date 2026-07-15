import './App.css'
import { FormularioContainer } from './components/FormularioProductoFeature/FormularioProductoContainer/FormularioProductoContainer'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import ProductoDetalle from './components/ProductoItemFeature/ProductoItemDetalle/ProductoItemDetalle'
import Cart from './components/CartFeature/Cart'
import ProductosNacionales from './components/ProductoItemFeature/ProductosNacionales/ProductosNacionales'
import ProductosNacionalesDetalle from './components/ProductoItemFeature/ProductosNacionalesDetalle/ProductosNacionalesDetalle'
import GestionCupones from './components/GestionCupones/GestionCupones'
import Gestion from './components/Gestion/Gestion'
import Registro from './components/Registro/Registro'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Perfil from './components/Perfil/Perfil'
import Login from './components/Login/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SearchProvider } from './providers/SearchProvider'

function App() {
return (
    <SearchProvider>
    <Routes>
      <Route element={<Layout />} >
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        <Route path="/productos" element={<ProtectedRoute rolesPermitidos={['admin']}><Gestion /></ProtectedRoute>} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/alta" element={<FormularioContainer estadoInicialForm={{ id: '', nombre: '', precio: 0, imagen: '', descripcion: '', categoria: '', stock: 0, cantidad: 0 }} />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/productos-nacionales" element={<ProductosNacionales />} />
        <Route path="/productos-nacionales/:id" element={<ProductosNacionalesDetalle />} />
        <Route path="/admin/cupones" element={<GestionCupones />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<ProtectedRoute rolesPermitidos={['admin', 'user']}><Perfil /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
    </SearchProvider>
  )
}

export default App