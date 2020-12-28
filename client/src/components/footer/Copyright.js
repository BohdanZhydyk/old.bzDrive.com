import React from 'react'
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
  right:{
    width:'50%',
    margin:'0.5vw 2vw'
  },
  footerSpan:{
    margin:'0.5vw 1vw'
  }
})

export const Copyright = ({data})=>{

  const styles = useStyles()

  return (
    <div className={styles.right + " flex end"}>
      <span className={styles.footerSpan}>{data.copy}</span>
      <span className={styles.footerSpan}>
        <span className="txtOrg">{data.author[0]}</span>
        <span className="txtWht">{data.author[1]}</span>
        <span> </span>
        <span className="txtOrg">{data.author[2]}</span>
        <span className="txtWht">{data.author[3]}</span>
      </span>
      <span className={styles.footerSpan}>
        <span className="txtWht">{data.link[0]}</span>
        <span className="txtOrg">{data.link[1]}</span>
        <span className="txtWht">{data.link[2]}</span>
        <span className="txtOrg">{data.link[3]}</span>
      </span>
      <span className={styles.footerSpan}>
        {`2018-${ new Date().getFullYear() }`}
      </span>
    </div>
  )
}