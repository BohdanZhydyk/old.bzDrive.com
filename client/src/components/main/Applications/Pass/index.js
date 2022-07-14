import React, { useState, useEffect } from "react"

import "./Pass.scss"
import { bzGetUser } from "../../../../state/functions"
import { ScreenSaver } from "../../../All/ScreenSaver"

import { PassEl } from "./PassEl"


const PassApp = ()=>{

  const user = bzGetUser()
  const login = user.login
  const lang = user.lang

  let myPass = [
    {
      siteName: "Electroda.pl",
      siteData:[
        {
          link: "https://www.elektroda.pl/",
          userName: "bzua83@gmail.com",
          login: "bz83",
          pass: "**********",
          info: "informacja o stronie..."
        }
      ]
    },
    {
      siteName: "4PDA.ru",
      siteData:[
        {
          link: "http://4pda.ru/",
          userName: "bzua83@bz83.com",
          login: "bz83",
          pass: "**********",
          info: "informacja o stronie..."
        }
      ]
    },
    {
      siteName: "7themes",
      siteData:[
        {
          link: "https://7themes.su/",
          userName: "bz83",
          login: "bz83",
          pass: "**********",
          info: "informacja o stronie..."
        }
      ]
    },
    {
      siteName: "A-Z Techno",
      siteData:[
        {
          link: "http://aztechno.com.ua/",
          userName: "y_zhydyk",
          login: "y_zhydyk",
          pass: "**********",
          info: "informacja o stronie..."
        }
      ]
    },
    {
      siteName: "AcerFans",
      siteData:[
        {
          link: "http://acerfans.ru/",
          userName: "bz83",
          login: "bz83",
          pass: "**********",
          info: "informacja o stronie..."
        }
      ]
    },
    {
      siteName: "AliExpress",
      siteData:[
        {
          link: "https://www.aliexpress.com/",
          userName: "Bohdan Zhydyk",
          login: "bzcelica@gmail.com",
          pass: "**********",
          info: "informacja o stronie..."
        }
      ]
    },
    {
      siteName: "Aprovi",
      siteData:[
        {
          link: "http://www.aprovi.com.pl/",
          userName: "bz83",
          login: "bz83",
          pass: "**********",
          info: "informacja o stronie..."
        },
        {
          link: "http://www.aprovi.com.pl/",
          userName: "bzua83",
          login: "bzua83",
          pass: "**********",
          info: "informacja o stronie..."
        }
      ]
    }
  ]

  const [pass, setPass] = useState(false)

  useEffect( ()=>{ !pass && setPass(myPass) },[])

  console.log("pass", pass)
  
  let PassFn = (action)=>{
    console.log(action)
    switch(action.type){
      case "OPEN_CLOSE_EL":
        setPass( myPass.map( (el, p)=>{
          return {...el, edit:(p === action.n ? action.edit : false)}
        }))
        break
      default: break
    }
  }

  return(
    <div className="Pass flex column">

      <div className="title flex">
        <span>{ `Passwords for:` }</span>
        <span className="txtOrg bold flex">{ login }</span>
      </div>
      
      <div className="PassTable flex start wrap">
      {
        !pass
        ? <ScreenSaver />
        : pass.map( (el, n)=> <PassEl props={{el, n, PassFn}} key={`PassEl${n}`} /> )
      }
      </div>

    </div>
  )
}

export default PassApp