import React from 'react'


export const Inputs = ({auth, fn})=>{
	return(
    <div className="inputs" >
      {
        auth.forms.map( (form)=>{
          return (
            form.active &&
            form.inputs.map( (input, index)=>
              <Input props={{ form, input, index, fn }} key={ input.name + index } />
            )
          )
        })
      }
    </div>
	)
}


const Input =({ props:{form, input, index, fn} })=>{

  let CHANGE_INPUT = (e)=>
    fn({
      app:"drive",
      type:"CHANGE_INPUT",
      payload: {
        form: form.txt,
        name: input.name,
        value: input.name === "email" ? e.target.value.toLowerCase().trim() : e.target.value.trim()
      }
    })

  return(
    <fieldset className="inputWrapper">

      <legend className="inputName">
        {input.name}<span className="inputErr txtOrg" >{input.error && input.error}</span>
      </legend>

      <input
        type={ input.type }
        placeholder={ `enter ${input.name} here...` }
        value={ input.val }
        onChange={ (e)=> CHANGE_INPUT(e) }
      />

    </fieldset>
  )
}