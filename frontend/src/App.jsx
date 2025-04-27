import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/footer"; // <-- Importas el Footer
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/Register/Register";
import AboutUs from "./pages/SobreNosotros/Nosotros";

function App() {
  return (
    <Router>
      <Nav /> {/* Navbar siempre arriba */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>

      <Footer /> {/* Footer siempre abajo */}
    </Router>
  );
}

export default App;
