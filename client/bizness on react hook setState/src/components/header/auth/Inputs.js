import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'


const useStyles = createUseStyles({
  inputs:{
    width:'90%'
  },
	inputWrapper:{
    margin:'0.5vw 0',
		padding:'0.5vw 0 1vw 0'
	},
	inputName:{
		color:'#999'
	},
	inputErr:{},
	input:{
		width:'95%',
		padding:'0.5vw',
		color:'#fff',
    backgroundColor:'#0000',
    border:'none',
    letterSpacing:'0.2vw',
    borderBottom:'0.1vw solid #999',
    '&:hover':{
      borderColor:'#191'
    }
	}
})

export const Inputs = ({auth, fn})=>{

	const styles = useStyles()

	return(
    <div className={styles.inputs}>
      {
        auth.forms.map( (form)=>{
          return (
            form.act === "y" &&
            form.inputs.map( (input, index)=>{
              return (
                <div className={styles.inputWrapper} key={ input.name + index } >
                  <label className={styles.inputName} >
                    { input.name }<span className={classNames({ [styles.inputErr]:true, 'txtOrg':true })}>{input.error && input.error}</span>
                  </label>
                  <input className={styles.input} type={ input.type } placeholder={ `enter ${input.name} here...` }
                        value={ input.val }
                        onChange={ (event)=>fn({
                            type:"CHANGE_INPUT_VALUE",
                            payload: {
                              form: form.txt,
                              name: input.name,
                              value: input.name === "email" ? event.target.value.toLowerCase().trim() : event.target.value.trim()
                            }
                          })
                        }
                  />
                </div>
              )
            })
          )
        })
      }
    </div>
	)
}
