import { bzPost } from "./../../../../state/functions"

export const GET_PASS = (action, setPass)=>{
  bzPost( "/getPass", { getAll:true, query:action.query, sort:{siteName:1} }, (data)=>{
    setPass( [{ new:true, siteData:[{pass:""}] }, ...data] )
  })
}

export const OPEN_CLOSE_EL = (action, pass, setPass)=>{
  let n = action.n
  let edit = action.edit
  setPass( pass.map( (el, p)=>{ return {...el, edit:(p === n ? edit : false), save:false} }))
}

export const CHG_SITENAME = (action, element, setElement)=>{
  setElement( {...element, siteName:action.value, save:true} )
}

export const CHG_LINK = (action, element, setElement)=>{
  setElement( {...element, link:action.value, save:true} )
}

export const CHG_INFO = (action, element, setElement)=>{
  setElement( {...element, info:action.value, save:true} )
}

export const CHG_USERNAME = (action, element, setElement)=>{
  setElement({
    ...element, save:true,
    siteData:element.siteData.map(
      (subEl, k)=> k === action.input.inputNr ? {...subEl, userName:action.value} : subEl
    )
  })
}

export const CHG_LOGIN = (action, element, setElement)=>{
  setElement({
    ...element, save:true,
    siteData:element.siteData.map(
      (subEl, k)=> k === action.input.inputNr ? {...subEl, login:action.value} : subEl
    )
  })
}

export const CHG_PASS = (action, element, setElement)=>{
  action.input.val !== "??????????" &&
  setElement({
    ...element, save:true,
    siteData:element.siteData.map(
      (subEl, k)=> k === action.input.inputNr ? {...subEl, pass:action.value} : subEl
    )
  })
}

export const KEYUP_IMG_PASS = (action, element, setElement)=>{

  let _id = action.input.id
  let nr = action.input.inputNr

  action.value === "??????????" 
  ?
  bzPost( "/getPass", { getOne:true, query:{_id, nr} }, (data)=>{
    setElement(
      {
        ...element,
        siteData:element.siteData.map( (subEl, i)=>
          i === nr
          ? {...subEl, pass: data ? data : ""}
          : subEl
        )
      }
    )
  })
  :
  setElement(
    {
      ...element,
      siteData:element.siteData.map( (subEl, i)=>
        i === nr
        ? {...subEl, pass:false}
        : subEl
      )
    }
  )
}

export const DEL_LINE = (action, element, setElement)=>{
  let el = element
  el.siteData.splice(action.nr, 1)
  setElement( el )
}

export const ADD_LINE = (action, element, setElement)=>{
  let newEl = {userName:false, login:false, pass:""}
  setElement( {...element, siteData:[...element.siteData, newEl]} )
}

export const SAVE_PASS = (action, login, setPass)=>{
  setPass(false)
  bzPost( "/getPass", { save:true, user:login, query:action.element }, (data)=>{
    GET_PASS({query:{"user":login}}, setPass)
  })
}

export const DEL_PASS = (action, login, setPass)=>{
  setPass(false)
  bzPost( "/getPass", { delete:true, query:action.id }, (data)=>{
    GET_PASS({query:{"user":login}}, setPass)
  })
}