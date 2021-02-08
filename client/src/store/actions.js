import { state, setState } from './store'
import { bzPost } from './functions'


export const TOGGLE_MENU = (action)=>{

  setState({
    ...state, auth:{
      ...state.auth, active:!action.payload
    }
  })
  
}

export const TOGGLE_FORM = (action)=>{

  setState({
    ...state, auth: {
      ...state.auth, forms: state.auth.forms.map( (form)=>{
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
    ...state, auth: {
      ...state.auth, forms: state.auth.forms.map( (form)=>{
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
  })

}


export const SEND_FORM = (action)=>{

  const getInputValue= (state, form, name)=>{
    let forms = state.auth.forms
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
    {
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

      console.log('auth', data)

      let err = data.err
      let user = data.user

      if(!err){
        TOGGLE_MENU({payload: true})
        TOGGLE_FORM({payload:"login"})
        setState({...state, user})
      }
      else{
        setState({
          ...state, auth: {
            ...state.auth, forms: state.auth.forms.map( (form)=>{
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
        })
      }
    
  })

    
}

export const EXIT_MENU = (action)=>{

  localStorage.removeItem('bzToken')
  localStorage.removeItem('user')
  
  setState({
    auth: false,
    copyright: false,
    projects: false,
    user: false,
    nav: false
  })

  bzPost( {link:"/start"}, (data)=>{
    setState({
      auth: data.auth,
      copyright: data.copyright,
      projects: data.projects,
      user: JSON.parse( localStorage.getItem('user') ),
      nav: [
        {to:"/", name:'documentation'},
        {to:"/contacts", name:'contacts'},
        {to:"/about", name:'about'}
      ]
    })
  })

}
