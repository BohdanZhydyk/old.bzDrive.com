import axios from 'axios'
import { api } from './variables'

import {
	getInputValue,
	setInputError
} from './functions'



export const TOGGLE_AUTH_PANNEL = (state, action)=>{
  return {
    ...state,
    auth:{
      ...state.auth,
      active:!action.payload
    }
  }
}

export const SEND_FORM = (state, action)=>{
  return axios.post(
    api+'/auth',
    {
      login:getInputValue(state, action.payload, 'login'),
      email:getInputValue(state, action.payload, 'email'),
      pass :getInputValue(state, action.payload, 'pass' ),
      pass1:getInputValue(state, action.payload, 'pass1'),
      pass2:getInputValue(state, action.payload, 'pass2'),
      form:action.payload
    }
  )
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
