import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import "./Main.scss"
import { ScreenSaver } from "../All/ScreenSaver"
import Error from './Error'
import Workshop from "./Workshop"
import News from "./News"
import Applications from "./Applications"
import Office from "./Office"
import Statistic from "./Statistic"
import Profile from "./Profile"
import Cookies from "./Cookies"
import CV from "./Applications/apps/CV"
import Bistro from "./Applications/apps/Bistro"
import Unsplash from './Applications/apps/Unsplash'


const Main = ({ props:{state, user, side, appFn} })=>{

  let nav = state ? state.nav : []

  let classes = `flex column start ${(side.ava || side.menu) ? `blur` : ``}`  
  let MAIN_CLICK = ()=> (side.ava || side.menu) && appFn({ type:"SIDE_CLICK", payload:{ava:false, menu:false} })

  let routes = (to)=>{
    switch(to){
      case "/news":                 return <News />
      case "/profile":              return <Profile />
      // Office
      case "/office/zl":            return <Office />
      case "/office/fs":            return <Office />
      case "/office/fz":            return <Office />
      case "/office/sp":            return <Office />
      case "/office/kl":            return <Office />
      case "/office/to":            return <Office />
      // Applications
      case "/apps/store":           return <Applications />
      case "/apps/cv":              return <CV />
      case "/apps/unsplash":        return <Unsplash />
      // Statistic
      case "/statistic/traffic":    return <Statistic />
      case "/statistic/finances":   return <Statistic />
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