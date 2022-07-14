import React from 'react'
import { Routes, Route } from 'react-router-dom'

import "./Main.scss"
import { ScreenSaver } from "./../All/ScreenSaver"

import Error from './Error'
import Workshop from "./Workshop"
import News from "./News"

import ZL from "./Office/ZL"
import FS from "./Office/FS"
import FZ from './Error'
import SP from './Error'
import KL from './Error'
import TO from './Error'
import Document from "./Office/Document"

import CV from "./Applications/CV"
import Store from "./Applications/Store"
import Unsplash from './Applications/Unsplash'
import Pass from './Applications/Pass'

import Traffic from "./Statistic/Traffic"
import Finance from "./Statistic/Finance"

import Profile from "./Profile"
import Cookies from "./Cookies"


const Main = ({ props:{state, user, side, appFn} })=>{

  let path = window.location.pathname.split("/")
  let nav = state ? state.nav : []

  let classes = `flex column start ${(side.ava || side.menu) ? `blur` : ``}`  
  let MAIN_CLICK = ()=>{
    (side.ava || side.menu) && appFn({ type:"SIDE_CLICK", payload:{ava:false, menu:false} })
    appFn({type:"NAV_ACTIVE", payload:{btn:path, show:false} })
  }

  let routes = (to)=>{
    switch(to){
      case "/news":                 return <News />
      case "/profile":              return <Profile />
      // Applications
      case "/apps/store":           return <Store />
      case "/apps/cv":              return <CV />
      case "/apps/unsplash":        return <Unsplash />
      case "/apps/pass":            return <Pass />
      // Office
      case "/office/zl":            return <ZL />
      case "/office/fs":            return <FS />
      case "/office/fz":            return <FZ />
      case "/office/sp":            return <SP />
      case "/office/kl":            return <KL />
      case "/office/to":            return <TO />
      // Statistic
      case "/statistic/traffic":    return <Traffic />
      case "/statistic/finances":   return <Finance />
      default:                      return <Workshop />
    }
  }

  return(
    <main className={classes} onClick={ ()=> MAIN_CLICK() }>

      {
        state
        ?
        <Routes>
        {
          nav.map( (path, n)=>{

            let el = routes(path.to)
            let key = `Route${n}${path.to}`

            return(
              <>

                <Route path={path.to} element={el} key={key} />

                {
                  path.subnav && path.subnav.map( (subpath, k)=>{

                    let subPath = path.to + subpath.to
                    let subEl = routes(subPath)
                    let subKey = `Route${n}${k}${subPath}`

                    return <Route exact path={subPath} element={subEl} key={subKey} />
                    
                  })
                }

              </>
            )
          })
        }

          <Route exact path="/document" element={ <Document /> } />
        
          <Route exact path="/cookies" element={ <Cookies /> } />

          <Route path="*" element={ <Error /> } />

          {/* <Route path="*" element={ <Navigate to="/" /> } /> */}

        </Routes>
        :
        <ScreenSaver />
      }

    </main>
  )
}

export default Main