import React from 'react'
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
	authPannel:{
    position:"absolute",
		top:'4vw',
		right:'0.5vw',
		width:"40%",
		padding:'1vw',
		backgroundColor:'#222',
		border:'1px solid #999',
		borderRadius:'0.5vw',
		zIndex:'999'
  },
  headerMenuInputs:{
    width:'90%'
  },
	headerMenuInput:{
		padding:'0.5vw 0 1vw 0'
	},
	inputName:{
		color:'#999'
	},
	inputErr:{
		display:'none'
	},
	headerMenuInputTarget:{
		width:'95%',
		padding:'0.5vw',
		color:'#fff',
		backgroundColor:'#0000',
		border:'none',
		borderBottom:'0.1vw solid #999'
	},
	headerMenuBtns:{
    width:'90%',
    margin:'1vw 0 0 0'
  },
	headerMenuBtn:{
		width:'40%',
		backgroundColor:'#171',
		borderRadius:'0.5vw',
		padding:'0.5vw',
		margin:'0.5vw',
		color:'#fff',
		textAlign:'center'
	},
	headerMenuBtnActive:{
		width:'80%',
		fontSize:'1.5vw',
		padding:'0.5vw 1.5vw'
	}
})

export const AuthPannel = ({auth, fn})=>{

	const styles = useStyles()

	return(
		<div className={styles.authPannel + " flex wrap"} >
      <div className={styles.headerMenuInputs}>
				{
					auth.forms.map( (form)=>{
						return (
							form.act === "y" &&
							form.inputs.map( (input, index)=>{
								return (
									<div className={styles.headerMenuInput + `${input.name}Input` } key={ input.name + index } >
										<div className={styles.inputName} >
											{ input.name }<span className={styles.inputErr + " txtOrg"}> - error</span>
										</div>
										<input className={styles.headerMenuInputTarget} type={ input.type } placeholder={ `enter ${input.name} here...` } />
									</div>
								)
							})
						)
					})
				}
			</div>
			<div className={styles.headerMenuBtns + " flex wrap"} >
				{
					auth.forms.map( (btn, index)=>{
						return( btn.act === "y" &&
							<span className={styles.headerMenuBtn +" "+ styles.headerMenuBtnActive} key={ btn.txt + index } >
								{ btn.txt }
							</span>
						)
					})
				}
				{
					auth.forms.map( (btn, index)=>{
						return( btn.act === "n" &&
							<span className={styles.headerMenuBtn} key={ btn.txt + index }
									onClick={ ()=>fn({type:"CHG_FORM", payload:btn.txt}) } >
								{ btn.txt }
							</span>
						)
					})
				}
			</div>
    </div>
	)
}
