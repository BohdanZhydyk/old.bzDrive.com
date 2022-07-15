import React, { useState, useEffect } from "react"
import { BrowserRouter } from "react-router-dom"

import { bzGetUser, bzGetToken, bzRemUser, bzSetUser } from "./state/functions"
import { GET_STATE, SIDE_CLICK, NAV_ACTIVE, SET_USER, LANG_CHG, COOKIE_OK, LOGOUT } from './action'
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"


function App() {

  const [user, setUser] = useState( ()=>{
    if( bzGetToken() ) return bzGetUser()
    bzRemUser()
    return false
  })

  const [state, setState] = useState(false)

  const [side, setSide] = useState(false)

  const [cookie, setCookie] = useState( true )
  
  const appFn = (action)=>{
    switch(action.type){
      case "GET_STATE":     GET_STATE( setState, setUser, setCookie );                            break
      case "SIDE_CLICK":    SIDE_CLICK( action.payload, setSide );                                break
      case "NAV_ACTIVE":    NAV_ACTIVE( action.payload, state, setState );                        break
      case "SET_USER":      SET_USER( action.payload, setState, setUser, setSide, setCookie );    break
      case "LANG_CHG":      LANG_CHG( action.payload, user, setUser, setSide, bzSetUser );        break
      case "COOKIE_OK":     COOKIE_OK( setCookie );                                               break
      case "LOGOUT":        LOGOUT( setState, setSide, setUser, setCookie );                      break
      default: break
    }
  }

  useEffect( ()=> appFn({type:"GET_STATE"}), [] )

  // console.log('state',state)

  return (

    <BrowserRouter>

      <Header props={{state, user, side, appFn}} />

      <Main props={{state, user, side, appFn}} />

      <Footer props={{state, user, cookie, appFn}} />

    </BrowserRouter>

  )
}

export default App