import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'


const useStyles = createUseStyles({
	btns:{
    width:'90%',
    margin:'1vw 0 0 0'
  },
	btn:{
		width:'40%',
		backgroundColor:'#171',
		borderRadius:'0.5vw',
		padding:'0.5vw',
		margin:'0.5vw',
		color:'#fff',
		textAlign:'center'
	},
	btnActive:{
		width:'80%',
		fontSize:'1.5vw',
		padding:'0.5vw 1.5vw'
	}
})

export const Buttons = ({auth, fn})=>{

	const styles = useStyles()

	return(
    <div className={classNames({ [styles.btns]:true, 'flex':true, 'wrap':true })} >
      {
        auth.forms.map( (btn, index)=>{
          return( btn.act === "y" &&
            <span className={classNames({ [styles.btn]:true, [styles.btnActive]:true })} key={ btn.txt + index }
                onClick={ ()=>fn({type:"SEND_FORM", payload:btn.txt}) } >
              { btn.txt }
            </span>
          )
        })
      }
      {
        auth.forms.map( (btn, index)=>{
          return( btn.act === "n" &&
            <span className={styles.btn} key={ btn.txt + index }
                onClick={ ()=>fn({type:"CHG_FORM", payload:btn.txt}) } >
              { btn.txt }
            </span>
          )
        })
      }
    </div>
	)
}
