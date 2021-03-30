import { bzPost, setUser, getUser, remUser, setToken, getToken, remToken } from './../functions'
import initialState from './../../store/initialState.json'

export const drive = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":	      GET_STATE(action, state, setState); 			break
    case "ACTIVE_NAV_BTN":	ACTIVE_NAV_BTN(action, state, setState); 	break
    case "TOGGLE_MENU":     TOGGLE_MENU(action, state, setState); 		break
    case "TOGGLE_FORM":     TOGGLE_FORM(action, state, setState); 		break
    case "CHANGE_INPUT":    CHANGE_INPUT(action, state, setState); 		break
    case "SEND_FORM":       SEND_FORM(action, state, setState);       break
    case "EXIT_MENU":       EXIT_MENU(action, state, setState);       break
    default: break
  }
}

function funcForms(forms, payload){
  return(
    forms.map( (form)=>
      form.txt === payload
      ?	{...form, active:true, inputs:form.inputs.map( (input)=>{ return {...input, val:"", error:""}  }) }
      :	{...form, active:false, inputs:form.inputs}
    )
  )
}

const GET_STATE = (action, state, setState)=>{

  bzPost("/drive", {}, (data)=>{
    
    setState({
      ...state,
      drive: data.drive,
      user: getUser()
    })

  })

}

const ACTIVE_NAV_BTN = (action, state, setState)=>{

  setState({
    ...state,
    drive: {
      ...state.drive,
      nav: state.drive.nav.map( (item, index)=>
        (item.to === action.payload)
        ? {...item, active:true}
        : {...item, active:false}
      )
    }
  })

}

const TOGGLE_MENU = (action, state, setState)=>{

  setState({
    ...state,
    drive:{
      ...state.drive,
      auth:{
        ...state.drive.auth,
        active:!action.payload
      }
    }
  })
  
}

const TOGGLE_FORM = (action, state, setState)=>{

  setState({
    ...state,
    drive:{
      ...state.drive,
      auth:{
        ...state.drive.auth,
        forms: funcForms(state.drive.auth.forms, action.payload)
      }
    }
  })

}

const CHANGE_INPUT = (action, state, setState)=>{

  setState({
    ...state,
    drive:{
      ...state.drive,
      auth:{
        ...state.drive.auth,
        forms: state.drive.auth.forms.map( (form)=>
          form.txt === action.payload.form
          ? {
              ...form,
              inputs: form.inputs.map( (input)=>
                input.name === action.payload.name ? {...input, val:action.payload.value} : {...input}
              )
            }
          : {...form}
        )
      }
    }
  })

}


const SEND_FORM = (action, state, setState)=>{

  const getInputValue= (state, form, name)=>{
    let forms = state.drive.auth.forms
    for(let i=0; i<forms.length; i++){
      if(forms[i].txt === form){
        let inputs = forms[i].inputs
        for(let n=0; n<inputs.length; n++){
          if(inputs[n].name === name) return inputs[n].val
        }
      }
    }
  }

  bzPost(
    "/auth",
    {
      login:getInputValue(state, action.payload, 'login'),
      email:getInputValue(state, action.payload, 'email'),
      pass :getInputValue(state, action.payload, 'pass' ),
      pass1:getInputValue(state, action.payload, 'pass1'),
      pass2:getInputValue(state, action.payload, 'pass2'),
      form:action.payload
    },
    (data)=>{

      // console.log('auth', data)

      let NoErr = ()=>
        (!data.login.error && !data.email.error && !data.pass.error && !data.pass1.error && !data.pass2.error)
        ? true
        : false

      setState({
        ...state,
        drive:{
          ...state.drive,
          auth:{
            ...state.drive.auth,
            active: !NoErr(),
            forms: state.drive.auth.forms.map( (form)=>
              form.txt === action.payload
              ? {
                  ...form, inputs: form.inputs.map( (input)=>{
                    switch(input.name){
                      case "login": return {...input, error: data.login.error}
                      case "email": return {...input, error: data.email.error}
                      case "pass":  return {...input, error: data.pass.error}
                      case "pass1": return {...input, error: data.pass1.error}
                      case "pass2": return {...input, error: data.pass2.error}
                      default: return {}
                    }
                  })
                }
              : {...form}
            )
          }
        },
        user: getUser()
      })
    
  })

}

const EXIT_MENU = (action, state, setState)=>{
  remUser()
  remToken()
  setState(initialState)
  GET_STATE(action, state, setState)
}