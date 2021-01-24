import React from 'react'
import { ContactsPannel } from './ContactsPannel'
import { Copyright } from './Copyright'


export const FooterBottom = ({copyright})=>{
  return (
    <div className="footerBottom flex" >
        { copyright &&
          <>
            <ContactsPannel contacts={copyright.contacts} />
            <Copyright data={copyright} />
          </>
        }
		</div>
  )
}