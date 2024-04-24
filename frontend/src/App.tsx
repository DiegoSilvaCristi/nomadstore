import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'
import Shipping from './pages/Shipping'
import './styles/global.css'
import './styles/navbar.css'
import './styles/home.css'
import './styles/cart.css'
import './styles/checkout.css'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/shipping" element={<Shipping/>} />
      </Routes>
    </>
  )
}

export default App
