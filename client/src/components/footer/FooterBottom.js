import React from 'react'
import { createUseStyles } from 'react-jss'

import { ContactsPannel } from './ContactsPannel'
import { Copyright } from './Copyright'


const useStyles = createUseStyles({
	footerBottom:{
    backgroundImage:'linear-gradient(#0002,#000e,#0002)'
  },
  right:{
    width:'50%',
    margin:'0.5vw 2vw'
  },
  footerSpan:{
    margin:'0.5vw 1vw'
  }
})

export const FooterBottom = ({copyright})=>{

  const styles = useStyles()

  return (
    <div className={styles.footerBottom + " flex"} >
        { copyright &&
          <>
            <ContactsPannel contacts={copyright.contacts} />
            <Copyright data={copyright} />
          </>
        }
		</div>
  )
}