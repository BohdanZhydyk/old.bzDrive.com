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

export const NAV_ACTIVE = (payload, state, setState)=>{
  let btn = payload.btn[1] ? "/" + payload.btn[1] : "/"
  let subBtn = payload.btn[2] ? "/" + payload.btn[2] : false
  setState({
    ...state,
    nav: state.nav.map( el=>{
        return {
          ...el,
          active: (el.to === btn) ? true : false,
          show: payload.show && (el.to === btn) ? !el.show : false,
          subnav:
            el.subnav
            ? subBtn
              ? el.subnav.map( sub=> (sub.to === subBtn) ? {...sub, active:true} : {...sub, active:false} )
              : el.subnav
            : false
        }
      }
    )
  })
}

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