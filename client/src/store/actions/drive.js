import { bzPost, remUser, remToken } from './../functions'
import { initialState } from './../initialState'

export const drive = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":	    GET_STATE(action, state, setState); 			break
    case "TOGGLE_MENU":   TOGGLE_MENU(action, state, setState); 		break
    case "TOGGLE_FORM":   TOGGLE_FORM(action, state, setState); 		break
    case "CHANGE_INPUT":  CHANGE_INPUT(action, state, setState); 		break
    case "SEND_FORM":     SEND_FORM(action, state, setState);       break
    case "EXIT_MENU":     EXIT_MENU(action, state, setState);       break
    default: break
  }
}

const GET_STATE = (action, state, setState)=>{

    bzPost("/drive", {}, (data)=>{
      
      if(data.err){ console.log('err', data.err) }
      else{
        setState({
          ...state,
          initialState: false,
          drive:{
            nav:data.res.nav,
            auth:data.res.auth,
            copy:data.res.copy
          }
        })
      }

    })

}

const TOGGLE_MENU = (action, state, setState)=>{

  setState({
    ...state, drive:{
      ...state.drive, auth:{
        ...state.drive.auth, active:!action.payload
      }
    }
  })
  
}

export const TOGGLE_FORM = (action, state, setState)=>{

  setState({
    ...state, drive:{
      ...state.drive, auth:{
        ...state.drive.auth, forms: state.drive.auth.forms.map( (form)=>{
          return (
            form.txt === action.payload
            ?	{...form, act:"y", inputs:form.inputs.map( (input)=>{ return {...input, val:"", error:""}  }) }
            :	{...form, act:"n", inputs:form.inputs}
          )
        })
      }
    }
  })

}

export const CHANGE_INPUT = (action, state, setState)=>{

  setState({
    ...state, drive:{
      ...state.drive, auth:{
        ...state.drive.auth, forms: state.drive.auth.forms.map( (form)=>{
          return (
            form.txt === action.payload.form
            ?{
                ...form, inputs: form.inputs.map( (input)=>{
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
  })

}


export const SEND_FORM = (action, state, setState)=>{

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

      console.log('auth', data)

      let err = data.err
      let user = data.user

      if(!err){
        TOGGLE_MENU({payload: true}, state, setState)
        TOGGLE_FORM({payload:"login"}, state, setState)
        setState({...state, user})
      }
      else{
        setState({
          ...state, drive:{
            ...state.drive, auth:{
              ...state.drive.auth, forms: state.drive.auth.forms.map( (form)=>{
                return (
                  form.txt === action.payload
                  ?
                  {
                    ...form, inputs: form.inputs.map( (input)=>{
                      switch(input.name){
                        case "login": return {...input, error: err.login}
                        case "email": return {...input, error: err.email}
                        case "pass":  return {...input, error: err.pass }
                        case "pass1": return {...input, error: err.pass1}
                        case "pass2": return {...input, error: err.pass2}
                        default: return {}
                      }
                    })
                  }
                  :
                  {...form}
                )
              })
            }
          }
        })
      }
    
  })

}

export const EXIT_MENU = (action, state, setState)=>{
  remUser()
  remToken()
  setState(initialState)
}
