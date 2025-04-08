import { BrowserRouter as Router, Routes, Route } from "react-router";
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage/LoginPage";
import Home from './pages/Home';
import RegisterPage from "./pages/Register/Register";
import AboutUs from "./pages/SobreNosotros/Nosotros";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </Router>
  )
};
export default App