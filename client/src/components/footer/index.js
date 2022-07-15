import React from 'react'

import "./Footer.scss"
import { NoData } from "../All/NoData"
import { Cookie } from './Cookie'
import { Contacts } from './Contacts'
import { Copyright } from './Copyright'


const Footer = ({ props:{state, user, cookie, appFn} })=>{

  const contacts = state?.info?.contacts

  const author = state?.info?.author

  const link = state?.info?.link

  return(
    <footer className="flex between wrap" style={cookie ? {} : {marginBottom:"5vw"}}>

      <div className="Contacts flex start">
				{
          !contacts
          ? <NoData props={["Img", "Img", "Img", "Img", "Img"]} />
          : <Contacts props={{contacts}} />
        }
			</div>

      <div className="Copy flex end">
				{
          !author || !user || !link
          ? <NoData props={["Txt", "Txt", "Txt", "Txt", "Txt"]} />
          : <Copyright props={{author, user, link}} />
        }
			</div>
      
      {
        !cookie &&
        <Cookie props={{user, cookie, appFn}} />
      }
      
    </footer>
  )
}

export default Footer