import axios from 'axios'
import { api } from './variables'
import { state, setState } from './store'
import { bzPost } from './functions'


export const TOGGLE_AUTH_PANNEL = (action)=>{

  setState({
    ...state,
    auth:{
      ...state.auth,
      active:!action.payload
    }
  })
  
}

export const TOGGLE_FORM = (action)=>{

  setState({
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
  })

}

export const CHANGE_INPUT_VALUE = (action)=>{

  setState({
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
  })

}


export const SEND_FORM = (action)=>{

  const getInputValue= (state, form, name)=>{
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

  bzPost(
    {
      method:"POST",
      link:"/auth",
      object: {
        login:getInputValue(state, action.payload, 'login'),
        email:getInputValue(state, action.payload, 'email'),
        pass :getInputValue(state, action.payload, 'pass' ),
        pass1:getInputValue(state, action.payload, 'pass1'),
        pass2:getInputValue(state, action.payload, 'pass2'),
        form:action.payload
      }
    }, (data)=>{

      console.log('formdata', data)

      let err = data.err

      if(!err){
        TOGGLE_AUTH_PANNEL({payload: true})
        TOGGLE_FORM({payload:"login"})
        setState({
          ...state,
          USER: data.USER
        })
      }
      else{
        setState({
          ...state,
          auth: {
            ...state.auth,
            forms: state.auth.forms.map( (form)=>{
              return (
                form.txt === action.payload
                ?
                {
                  ...form,
                  inputs: form.inputs.map( (input)=>{
                    if(input.name === "login"){ return {...input, error: err.login} }
                    if(input.name === "email"){ return {...input, error: err.email} }
                    if(input.name === "pass")	{ return {...input, error: err.pass} 	}
                    if(input.name === "pass1"){ return {...input, error: err.pass1} }
                    if(input.name === "pass2"){ return {...input, error: err.pass2} }
                  })
                }
                :
                {...form}
              )
            })
          }
        })
      }
    
  })

    
}

