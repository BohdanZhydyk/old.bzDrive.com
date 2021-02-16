import React from 'react'


export const ContactsPannel = ({contacts})=>{
  return (
    <div className="left flex start" >
    {
      contacts
      ?
      contacts.map( (contact, index)=>{
        return (
          <a href={contact.val} target="_blank" rel="noreferrer" key={`contact${contact.key+index}`} >
            <img className="imgBtn" alt="contact"
                src={`https://files.bzdrive.com/img/ico/contacts/${contact.key}.png`} />
          </a>
        )
      })
      :
      [1,2,3,4].map( (item, index)=> <div className="noData noDataImg" key={`contact${index}`} ></div> )
    }
    </div>
  )
}