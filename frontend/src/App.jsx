// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/Register/Register";
import Home from "./pages/Home";
import AboutUs from "./pages/SobreNosotros/Nosotros";

// Ajustá según tus rutas
function App() {
  return (
    <Router>
      <Nav />
      
      {/* Padding para que el contenido no quede oculto debajo del nav fijo */}
      <div style={{ paddingTop: "160px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
