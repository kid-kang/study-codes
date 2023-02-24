import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import './reset.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter><App /></BrowserRouter>
)
