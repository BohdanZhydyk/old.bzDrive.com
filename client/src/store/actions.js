import axios from 'axios'


export const TOGGLE_AUTH_PANNEL = (state, action)=>{
  return {
    ...state,
    auth:{
      ...state.auth,
      active:!action.payload
    }
  }
}

export const TOGGLE_FORM = (state, action)=>{
  return {
    ...state,
    auth: {
      ...state.auth,
      forms: state.auth.forms.map( (form)=>{
        return (
          form.txt === action.payload
          ?	{...form, act:"y", inputs:form.inputs.map( (input)=>{ return {...input, val:"", error:""}  }) }
          :	{...form, act:"n", inputs:form.inputs}
        )
      })
    }
  }
}

export const CHANGE_INPUT_VALUE = (state, action)=>{
  return {
    ...state,
    auth: {
      ...state.auth,
      forms: state.auth.forms.map( (form)=>{
        return (
          form.txt === action.payload.form
          ? {
              ...form,
              inputs: form.inputs.map( (input)=>{
                return (
                  input.name === action.payload.name
                  ? {...input, val:action.payload.value}
                  : {...input}
                )
              })
            }
          : {...form}
        )
      })
    }
  }
}

