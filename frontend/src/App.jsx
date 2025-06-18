import { useState } from 'react'
import Routing from './router/Routing'
import { CartProvider } from "./context/CartContext";


function App() {
  const [count, setCount] = useState(0)

  return (
    <CartProvider>
<Routing />
    </CartProvider>
      
  )
}

export default App
