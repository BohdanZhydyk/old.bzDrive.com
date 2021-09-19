import React from 'react'

import { ScreenSaver } from '../ScreenSaver'


export const Contacts = ({ props:{contacts} })=>{

  let src = (contacts)=> `https://files.bzdrive.com/img/ico/contacts/${contacts.key}.png`

  return (
    <div className="left flex start" >
    {
      contacts
      ?
      <>
      {
        contacts.map( (contact, index)=>{
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