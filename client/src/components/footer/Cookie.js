import { NavLink } from 'react-router-dom'
import { translate } from "../../state/translate"


export const Cookie = ({ props:{user, cookie, appFn} })=>{

  let lang = user.lang
  let to = "/cookies"

  let COOKIE_OK = ()=> appFn({ type:"COOKIE_OK" })

  let GetTxt = (txt)=> translate(lang, txt)

  return (
    <div className="CookiePannel flex">

      <span className="txtYlw">{ GetTxt("CookiesTxt") }</span>

      <NavLink to={to}>
        <span className="moreCookie flex">{ GetTxt("CookiesLink") }</span>
      </NavLink>
      
      <div className="cookieBtn flex" onClick={ ()=> COOKIE_OK() }>
        <span>{ GetTxt("CookiesBtn") }</span>
      </div>

    </div>
  )
}