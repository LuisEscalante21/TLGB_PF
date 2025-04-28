import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import "../src/css/styles.css"
import "./assets/css/normalize.css";
import "./assets/css/styles.css";
import "./assets/css/responsive.css";
import "./assets/fonts/fontawesome-free-6.1.2-web/css/all.css";

createRoot(document.getElementById('root')).render(

    <App />

)
