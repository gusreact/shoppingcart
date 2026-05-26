import './App.css'
import { ProductoItemContainer } from './components/ProductoItemFeature/ProductoItemContainer/ProductoItemContainer'
import { FormularioContainer } from './components/FormularioProductoFeature/FormularioProductoContainer/FormularioProductoContainer'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import ProductoDetalle from './components/ProductoItemFeature/ProductoItemDetalle/ProductoItemDetalle'
import Cart from './components/CartFeature/Cart'

function App() {
return (
    <Routes>
      <Route element={<Layout />} >
        <Route path="/" element={<h1>Página de Inicio</h1>} />
        <Route path="/productos" element={<ProductoItemContainer Mensaje={"Todos los productos"}/>} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/alta" element={<FormularioContainer />} />
        <Route path="/carrito" element={<Cart mensaje={"Productos en el carrito"} />} />
      </Route>
    </Routes>
  )
}

export default App