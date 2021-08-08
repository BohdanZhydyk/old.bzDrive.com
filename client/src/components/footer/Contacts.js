import React from 'react'

import { ScreenSaver } from '../ScreenSaver'


export const Contacts = ({ props:{cont} })=>{

  let src = (cont)=> `https://files.bzdrive.com/img/ico/contacts/${cont.key}.png`

  return (
    <div className="left flex start" >
    {
      cont
      ?
      <>
      {
        cont.map( (contact, index)=>{
          return (
            <a className="contactBtn"
              href={contact.val}
              target="_blank"
              rel="noreferrer"
              key={`contact${contact.key+index}`} >

              <img className="imgBtn" alt="contact" src={ src(contact) } />

            </a>
          )
        })
      }
      </>
      : <ScreenSaver arr={["Img","Img","Img","Img","Img"]} />
    }
    </div>
  )
}