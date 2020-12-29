
export const getInputValue= (state, form, name)=>{
  for(let i=0; i<state.auth.forms.length; i++){
    if(state.auth.forms[i].txt === form){
      for(let n=0; n<state.auth.forms[i].inputs.length; n++){
        if(state.auth.forms[i].inputs[n].name === name){
          return state.auth.forms[i].inputs[n].val
        }
      }
    }
  }
}

export const setInputError = (state, action, errors)=>{
  return {
    ...state,
    auth: {
      ...state.auth,
      forms: state.auth.forms.map( (form)=>{
        return (
          form.txt === action.payload
          ? {
              ...form,
              inputs: form.inputs.map( (input)=>{
                if(input.name === "login"){ return {...input, error:errors.login} }
                if(input.name === "email"){ return {...input, error:errors.email} }
                if(input.name === "pass")	{ return {...input, error:errors.pass} 	}
                if(input.name === "pass1"){ return {...input, error:errors.pass1} }
                if(input.name === "pass2"){ return {...input, error:errors.pass2} }
              })
            }
          : {...form}
        )
      })
    }
  }
}