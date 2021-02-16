import React from 'react'


export const Inputs = ({auth, fn})=>{
	return(
    <div className="inputs" >
      {
        auth.forms.map( (form)=>{
          return (
            form.act === "y" &&
            form.inputs.map( (input, index)=>{
              return (
                <div className="inputWrapper" key={ input.name + index } >
                  <label className="inputName" >
                    { input.name }<span className="inputErr txtOrg" >{input.error && input.error}</span>
                  </label>
                  <input type={ input.type } placeholder={ `enter ${input.name} here...` }
                        value={ input.val }
                        onChange={ (event)=>fn({
                            app:"drive",
                            type:"CHANGE_INPUT",
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
