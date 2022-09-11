import { bzPost } from '../../../../state/functions'

export const GET_FIN = (fin, setFin)=>{

  bzPost( "/getFin", {getState:true}, (data)=> setFin([...data.fin]) )

}

export const EDIT_FIN = (action, fin, setFin)=>{
  setFin(
    fin.map( (el, i)=> i === action.nr ? {...el, edit:true} : {...el, edit:false} )
  )
}

export const CHG_MONTH = (action, fin, setFin)=>{
  setFin(
    fin.map( (el, i)=> i === action.nr ? {...el, date:{...el.date, month:action.value}} : el )
  )
}

export const CHG_YEAR = (action, fin, setFin)=>{
  setFin(
    fin.map( (el, i)=> i === action.nr ? {...el, date:{...el.date, year:action.value}} : el )
  )
}

export const CHG_IN = (action, fin, setFin)=>{
  setFin(fin.map( (el, i)=> i === action.nr ? {...el, in:action.value} : el ))
}

export const CHG_ART = (action, fin, setFin)=>{
  setFin(fin.map( (el, i)=> i === action.nr ? {...el, art:action.value} : el ))
}

export const CHG_OUT = (action, fin, setFin)=>{
  setFin(fin.map( (el, i)=> i === action.nr ? {...el, out:action.value} : el ))
}

export const CHG_ZUS = (action, fin, setFin)=>{
  setFin(fin.map( (el, i)=> i === action.nr ? {...el, ZUS:action.value} : el ))
}

export const PLUS_FIN = (action, fin, setFin)=>{
  setFin([
    {
      edit:true,
      date: {month:"00", year:"0000"}, in:"0.00", art:"0.00", out:"0.00", ZUS:"0.00"
    },
    ...fin.map( el=>{ return {...el, edit:false} } )
  ])
}

export const SAVE_FIN = (action, fin, setFin)=>{
  let newFin = action.fin.map( el=>{
    return {
    date: {year:el.date.year, month:el.date.month},
    in:el.in, art:el.art, out:el.out, ZUS:el.ZUS
  }
  })
  setFin(false)
  bzPost( "/getFin", {saveState:true, fin:newFin}, (data)=> setFin([...data.fin]) )
}