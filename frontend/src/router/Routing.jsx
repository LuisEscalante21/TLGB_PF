import React from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/Register/Register'
import AboutUs from '../pages/SobreNosotros/Nosotros'
import PlayStation from '../components/public/PlayStation'
import Home from '../components/public/Home'
import HeaderPublic from '../components/public/HeaderPublic'
import ConsoleNav from '../components/public/ConsoleNav'
import { AuthProvider } from '../context/AuthProvider'
import PublicLayout from '../components/public/PublicLayout'
import { Logout } from '../pages/LoginPage/Logout'
import { PublicRoute } from '../components/public/PublicRoute'
import PC from '../components/public/PC'
import Xbox from '../components/public/Xbox'
import Nintendo from '../components/public/Nintendo'
import ProductDetail from '../components/public/ProductDetail'
import Contact from '../components/public/Contact'
import TermsAndConditions  from '../components/public/Terms&Conditions'
import { PublicOnlyRoute } from '../components/public/PublicOnlyRoute'
import { PrivateRouter } from '../components/private/PrivateLayout/PrivateRouter'
import PrivateLayout from '../components/private/PrivateLayout/PrivateLayout'
import HomePrivate from '../components/private/HomePrivate'
import GestionProductos from '../components/private/pages/Products/GestionProductos'
import GestionEmpleados from '../components/private/pages/Employees/GestionEmpleados'
import PaymentScreen from '../components/private/pages/Pago/PaymentScreen'
import Gestionsuppliers from '../components/private/pages/suppliers/Gestionsuppliers'

const Routing = () => {
  return (
    <BrowserRouter>
    <AuthProvider>

        <Routes>

              <Route path="/login" element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              } />
            <Route path="/register" element={<RegisterPage />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} /> 
            <Route path="home" element={<Home />} /> 
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="playstation" element={<PlayStation />} />
            <Route path="pc" element={<PC />} />
            <Route path="xbox" element={<Xbox />} />
            <Route path="nintendo" element={<Nintendo />} />
            <Route path="producto/:id" element={<ProductDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="terminos" element={<TermsAndConditions />} />
          </Route>

          <Route element={<PrivateRouter />}>
              <Route path="/social" element={<PrivateLayout />} >
                <Route index element={<HomePrivate />} /> 
                <Route path="home" element={<HomePrivate />} />
                <Route path="productos" element={<GestionProductos />} />
                <Route path="empleados" element={<GestionEmpleados />} />
                <Route path="pago" element={<PaymentScreen />} />
                <Route path="Proveedores" element={<Gestionsuppliers />} />

              </Route>
          </Route>

          <Route path="*" element={
            <>
              <p>
                <h1>Error 404</h1>
                <Link to="/">Volver al Inicio</Link>
              </p>
            </>
          }/>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routing