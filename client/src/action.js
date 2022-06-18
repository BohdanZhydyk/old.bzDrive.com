import {
  bzPost,
  bzGetToken,
  bzGetUser,
  bzGetCookie,
  bzSetUser,
  bzSetCookie,
  bzRemToken,
  bzRemUser
} from "./state/functions"


export const GET_STATE = (setState, setUser, setCookie)=>{

  bzPost( '/getState', {}, (data)=>{
    setState({
      info:data.info,
      nav:data.nav
    })
    setUser( ()=>{
      if( bzGetToken() ) return bzGetUser()
      bzRemUser()
      return false
    })
    setCookie( bzGetCookie() )
  })

}

export const SIDE_CLICK = (payload, setSide)=> setSide(payload)

export const SET_USER = (payload, setState, setUser, setSide, setCookie)=>{
  setUser(payload)
  setState(false)
  setSide(false)
  GET_STATE(setState, setUser, setCookie)
}

export const LANG_CHG = (payload, user, setUser, setSide)=>{
  setSide({ava:false, menu:false})
  setUser({...user, lang:payload})
  bzSetUser({...user, lang:payload})
}

export const COOKIE_OK = (setCookie)=>{
  setCookie(true)
  bzSetCookie()
}

export const LOGOUT = (setState, setSide, setUser, setCookie)=>{
  bzRemUser()
  bzRemToken()
  setUser( bzGetUser() )
  setState(false)
  setSide(false)
  GET_STATE(setState, setUser, setCookie)
}