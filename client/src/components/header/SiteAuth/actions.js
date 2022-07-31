import {
  bzPost,
  bzSetUser,
  bzRemUser
} from '../../../state/functions'


export const CHG_INPUT = (payload, form, auth, setAuth)=>{

  let setInput = (payload)=>{
    setAuth(
      auth.map( el => (el.form === form)
        ?
        {
          ...el,
          inputs:
            el.inputs.map( inp => inp.name === payload.name
            ? {...inp, val:payload.val, error:payload.error}
            : {...inp}
          )
        }
        : {...el}
      )
    )
  }

  let isEmail = (obj)=>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !re.test(obj.val)
  }

  let isAlphanumeric = (obj)=>{
    return !obj.val.match(/^[0-9A-Za-z]+$/)
  }

  let isNumeric = (obj)=>{
    return !obj.val.match(/^[0-9]+$/)
  }

  let isLength = (obj, min, max)=>{
    return obj.val.length < min || obj.val.length > max
  }

  let isEmpty = (obj)=>{
    return obj.val.length < 1
  }

  switch(payload.name){
    case "login":
      setInput(
        isEmpty(payload)                    //isEmpty error:1
        ? {...payload, error:1}
        : isAlphanumeric(payload)           //isAlphanumeric error:2
          ? {...payload, error:2}
          : isLength(payload, 4, 8)         //isLength error:3
            ? {...payload, error:3}
            : {...payload, error:false}
      )
      break
    case "email":
      setInput(
        isEmpty(payload)                    //isEmpty error:1
        ? {...payload, error:1}
        : isEmail(payload)                  //isAlphanumeric error:5
          ? {...payload, error:5}
          : {...payload, error:false}
      )
      break
    case "confirm":
      setInput(
        isEmpty(payload)                    //isEmpty error:1
        ? {...payload, error:1}
        : isNumeric(payload)                //isNumeric error:6
          ? {...payload, error:6}
          : isLength(payload, 9, 9)        //isLength error:7
            ? {...payload, error:7}
            : {...payload, error:false}
      )
      break
    default:
      setInput(
        isEmpty(payload)                    //isEmpty error:1
        ? {...payload, error:1}
        : isAlphanumeric(payload)           //isAlphanumeric error:2
          ? {...payload, error:2}
          : isLength(payload, 8, 16)        //isLength error:4
            ? {...payload, error:4}
            : {...payload, error:false}
      )
      break
  }

}

export const TOGGLE_FORM = (payload, auth, setAuth)=>{
  setAuth(
    auth.map( el => (el.form === payload)
      ? { ...el, active:true, inputs:el.inputs.map( inp=>{ return {...inp, val:""} } ) }
      : { ...el, active:false, inputs:el.inputs.map( inp=>{ return {...inp, val:""} } ) }
    )
  )
}

export const SEND_FORM = (form, activeForms, auth, setAuth, appFn)=>{

  bzPost('/auth', activeForms[0], (data)=>{

    let SET_USER = (user)=>{
      bzSetUser(user)
      appFn({type:"SET_USER", payload:user})
      appFn({type:"SIDE_CLICK", payload:{ava:false, menu:false} })
    }

    data?.user
    ? SET_USER(data.user)
    : setAuth(
        auth.map( el => (el.form === form)
          ? {...el, inputs:data.inputs}
          : {...el}
        )
      )

  })
}