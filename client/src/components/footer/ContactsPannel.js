import React from 'react'
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
  left:{
    width:'50%',
    margin:'0.5vw 2vw'
  }
})

export const ContactsPannel = ({contacts})=>{

  const styles = useStyles()

  return (
    <div className={styles.left + " flex start"}>
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