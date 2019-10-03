import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import Routes from './routes'

import logo from './assets/logo.svg'
import './App.css'

export default () =>
  <BrowserRouter>
    <div className="container">
      <Link to="/dashboard">
        <img src={logo} alt="Aircnc logo" />
      </Link>

      <div className="content">
        <Routes />
      </div>
    </div>
  </BrowserRouter>
