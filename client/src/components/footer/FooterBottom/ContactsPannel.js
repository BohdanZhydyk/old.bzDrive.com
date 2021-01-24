import React from 'react'


export const ContactsPannel = ({contacts})=>{
  return (
    <div className="left" >
    { contacts.map( (contact, index)=>{
        return (
          <a href={contact.val} target="_blank" rel="noreferrer" key={contact.key + index} >
            <img className="imgBtn" alt="contact"
                src={`https://files.bzdrive.com/img/ico/contacts/${contact.key}.png`} />
          </a>
        )
      })
    }
    </div>
  )
}