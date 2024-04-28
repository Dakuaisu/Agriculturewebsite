import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Navigation from './Navigation'

import Signup from './Signup'
import Footer from './Footer'


ReactDOM.createRoot(document.getElementById('signin')).render(
  <React.StrictMode>
    <>
    <Navigation />
    <Signup />
    <Footer></Footer>
    </> 
  </React.StrictMode>,
)
