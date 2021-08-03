import React from 'react'


export const ContactsPannel = ({info})=>{

  let src = (contact)=> `https://files.bzdrive.com/img/ico/contacts/${contact.key}.png`

  return (
    <div className="left flex start" >
    {
      info
      ?
      info.contacts.map( (contact, index)=>{
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
      :
      [1,2,3,4].map( (i)=> <div className="noData noDataImg" key={`contact${i}`} ></div> )
    }
    </div>
  )
}