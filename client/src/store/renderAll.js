import React from 'react'
import ReactDOM from 'react-dom'
import './../style.scss'
import App from './../App'
import { fn } from './store'


export const renderAll = (state)=>{
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} fn={fn}/>
    </React.StrictMode>,
    document.getElementById('root')
  )
}