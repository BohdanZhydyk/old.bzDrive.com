import React from 'react'
import { createUseStyles } from 'react-jss'

import { NavLink } from 'react-router-dom'


const useStyles = createUseStyles({
  headerMenuItem:{
    width:'10%',
    minHeight:'1.5vw',
    margin:'0 0.5vw',
    fontSize:'1vw',
    backgroundImage:'linear-gradient(#333,#111,#333)',
    borderTop:'1px solid #999',
    borderBottom:'1px solid #999',
    borderRadius:'0.5vw'
  }
})

export const MenuBtn = ({btn})=>{
  
  const styles = useStyles()
  
	return(
    <NavLink to={ btn.to } className={styles.headerMenuItem + " flex"} >
      <span>{ btn.name }</span>
    </NavLink>
	)
}