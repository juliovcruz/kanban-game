import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { LocalStorage } from './data/localStorage'

const database = new LocalStorage()

ReactDOM.render(
  <React.StrictMode>
    <App database={database}/>
  </React.StrictMode>,
  document.getElementById('root')
)
