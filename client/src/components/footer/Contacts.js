import React from 'react'


export const Contacts = ({ props:{contacts} })=>{

  
  return (
    <div className="flex start" >
    {
      contacts.map( (btn, index)=>{

        let src = `https://bzdrive.com/files/ico/contacts/${btn.key}.png`
        
        return (
          <a className="contactBtn"
            href={btn.val}
            target="_blank"
            rel="noreferrer"
            key={`contact${btn.key+index}`} >

            <img className="imgBtn" src={src} alt="contact" />

          </a>
        )
      })
    }
    </div>
  )
}