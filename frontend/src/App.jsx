import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Home from './components/public/Home'
import Routing from './router/Routing'
import AboutUs from './pages/SobreNosotros/Nosotros'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routing />
  )
}

export default App
