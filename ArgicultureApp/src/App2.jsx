import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Navigation from './Navigation'
import Footer from './Footer'
import Signin from './Signin'


ReactDOM.createRoot(document.getElementById('signin')).render(
  <React.StrictMode>
    <>
    <Navigation />
    <Signin />
    <Footer></Footer>
    </> 
  </React.StrictMode>,
)
