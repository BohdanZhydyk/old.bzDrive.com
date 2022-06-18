import { Routes, Route, Navigate } from 'react-router-dom'

import "./Main.scss"
import { ScreenSaver } from "../All/ScreenSaver"
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

  let saver = state ? false : true
  let classes = `flex column start ${(side.ava || side.menu) ? `blur` : ``}`

  let navigation = state ? state.nav : []
  
  let MAIN_CLICK = ()=> (side.ava || side.menu) && appFn({ type:"SIDE_CLICK", payload:{ava:false, menu:false} })

  return(
    <main className={classes} onClick={ ()=> MAIN_CLICK() }>

      {
        saver
        ?
        <ScreenSaver />
        :
        <Routes>
        {
          navigation.map( (path, n)=>{
            let routes = (to)=>{
              switch(to){
                case "/news":        return <News />
                case "/apps":        return <Applications />
                case "/office":      return <Office />
                case "/statistic":   return <Statistic />
                case "/profile":     return <Profile />
                default:            return <Workshop />
              }
            }
            let key = `MainRoute${n}`
            return(
              <Route  path={path.to} element={ routes(path.to) } key={key +path.to} />
            )
          })
        }
          <Route exact path="/cv" element={ <CV /> } />
          <Route exact path="/cookies" element={ <Cookies /> } />

          <Route exact path="/apps/cv" element={ <CV /> } />
          <Route exact path="/apps/bistro" element={ <Bistro /> } />
          <Route exact path="/apps/unsplash" element={ <Unsplash /> } />

          <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
      }

    </main>
  )
}

export default Main