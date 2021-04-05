import React from 'react'

import { Input } from './Input'


export const Inputs = ({auth, lang, fn})=>{
	return(
    <div className="inputs" >
      {
        auth.forms.map( (form)=>{
          return (
            form.active &&
            form.inputs.map( (input, index)=>
              <Input props={{ form, input, lang, fn }} key={ input.name + index } />
            )
          )
        })
      }
    </div>
	)
}