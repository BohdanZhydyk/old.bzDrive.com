import React, { useState, useEffect } from 'react'
import './Cookies.scss'

import { bzGetUser, bzPost } from '../../../state/functions'
import { ScreenSaver } from './../../All/ScreenSaver'


const CookiesApp = ()=>{

  let lang = bzGetUser().lang

  const [cookies, setCookies] = useState(false)
  useEffect( ()=>{ !cookies && bzPost("/getCookies", {}, (data)=> setCookies(data.cookies) ) },[])

  return(
    <div className="cvApp flex column wrap">

    {
      !cookies
      ? <ScreenSaver />
      :
      <>
      {
        cookies.map( (el, i)=>{

          let key = `CookiesTag${i}`
          let txt = el.txt[lang]

          switch(el.tag){
            case "h2":
              return( <div className="h2 bold flex" key={key}>{txt}</div> )
            case "h3":
              return( <div className="h3 txtOrg bold flex" key={key}>{txt}</div> )
            case "version":
              return( <div className="version txtGrn flex start" key={key}>{txt}</div> )
            case "p":
              return( <p key={key}>{txt}</p> )
            case "a":
              let href = el.href ? el.href : txt
              return( <a href={href} target="_blank" rel="noreferrer" key={key}>{txt}</a> )
            case "ul":
              return(
                <div className="ul" key={key}>
                  <p>{txt}</p>
                  {
                    el.li.map( (liTxt, n)=>{
                      let key = `CookiesLi${i}${n}`
                      let text = `- ${liTxt[lang]}`
                      return(<p className="li flex start" key={key}>{text}</p>)
                    })
                  }
                </div>
              )
            default: break
          }
        })
      }
      </>
    }

    </div>
  )
}

export default CookiesApp