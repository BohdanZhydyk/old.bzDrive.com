import {
  bzPost,
  setUser,
  getUser,
  remUser,
  setToken,
  getToken,
  remToken
} from './../../store/functions'


export const actions = (action, header, setHeader)=>{
  switch(action.type){
    case "GET_STATE":	      GET_STATE(action, header, setHeader); 			break
    case "ACTIVE_NAV_BTN":	ACTIVE_NAV_BTN(action, header, setHeader); 	break
    case "TOGGLE_MENU":     TOGGLE_MENU(action, header, setHeader); 		break
    case "TOGGLE_FORM":     TOGGLE_FORM(action, header, setHeader); 		break
    case "CHANGE_INPUT":    CHANGE_INPUT(action, header, setHeader); 		break
    case "SEND_FORM":       SEND_FORM(action, header, setHeader);       break
    case "EXIT_MENU":       EXIT_MENU(action, header, setHeader);       break
    default: break
  }
}

let GET_STATE = (action, header, setHeader)=>{

  bzPost("/drive", {getState:true}, (data)=>{
    
    setHeader({
      ...header,
      info:data.info,
      auth:data.auth,
      nav:data.nav,
      user: getUser()
    })

  })

}

let ACTIVE_NAV_BTN = (action, header, setHeader)=>{

  setHeader({
    ...header,
    nav: header.nav.map( (item, index)=>
      (item.to === action.payload)
      ? {...item, active:true}
      : {...item, active:false}
    ),
    auth:{
      ...header.auth,
      active: false
    }
  })

}

let TOGGLE_MENU = (action, header, setHeader)=>{

  setHeader({
    ...header,
    auth:{
      ...header.auth,
      active: action.payload.active
    }
  })
  
}

let TOGGLE_FORM = (action, header, setHeader)=>{

  setHeader({
    ...header,
    auth:{
      ...header.auth,
      forms: header.auth.forms.map( (form)=>
        form.action === action.payload
        ?	{...form, active:true, inputs:form.inputs.map( (input)=>{ return {...input, val:"", error:""}  }) }
        :	{...form, active:false, inputs:form.inputs}
      )
    }
  })

}

let CHANGE_INPUT = (action, header, setHeader)=>{

  setHeader({
    ...header,
    auth:{
      ...header.auth,
      forms: header.auth.forms.map( (form)=>
        form.action === action.payload.form
        ? {
            ...form,
            inputs: form.inputs.map( (input)=>
              input.name === action.payload.name ? {...input, val:action.payload.value} : {...input}
            )
          }
        : {...form}
      )
    }
  })

}

let SEND_FORM = (action, header, setHeader)=>{

  const getInputValue= (header, form, name)=>{
    let forms = header.auth.forms
    for(let i=0; i<forms.length; i++){
      if(forms[i].action === form){
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
      login:getInputValue(header, action.payload, 'login'),
      email:getInputValue(header, action.payload, 'email'),
      pass :getInputValue(header, action.payload, 'pass' ),
      pass1:getInputValue(header, action.payload, 'pass1'),
      pass2:getInputValue(header, action.payload, 'pass2'),
      form:action.payload
    },
    (data)=>{

      // console.log('auth', data)

      let NoErr = ()=>
        (!data.login.error && !data.email.error && !data.pass.error && !data.pass1.error && !data.pass2.error)
        ? true
        : false

        setHeader({
        ...header,
        auth:{
          ...header.auth,
          active: !NoErr(),
          forms: header.auth.forms.map( (form)=>
            form.action === action.payload
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
        },
        user: getUser()
      })
    
  })

}

let EXIT_MENU = (action, header, setHeader)=>{
  remUser()
  remToken()
  setHeader(false)
  GET_STATE(action, header, setHeader)
}