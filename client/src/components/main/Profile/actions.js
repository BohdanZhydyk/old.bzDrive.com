import { bzPost } from './../../../state/functions'

import axios from 'axios'

export const GET_PROFILE = (action, profile, setProfile)=>{
  bzPost("/getProfile", { getProfile:true, login:action.login }, (data)=> setProfile(data) )
}

export const OPEN_SECTION = (action, sections, setSections)=>{
  setSections(
    sections.map( (el, nr)=> (nr === action.nr) ? {...el, act:true} : {...el, act:false} )
  )
}

export const CHG_AVA = (action, profile, setProfile)=>{

  let query = { fileAddr:action.fileAddr, fileName:action.oldFile }

  // console.log("query",query)
  
  bzPost("/deleteFile", query, (data)=>{
  //   // data.status === 200 &&
  //   // console.log("321",data)
  //   bzPost("/getProfile", {chgAva:true, login:action.login, fileName:action.newFile}, (data)=> setProfile(data) )
  // })
  // axios.post( 'https://bzdrive.com/deleteFile', query).then( (res)=>{
    // console.log("ok", data)

    bzPost("/getProfile", {chgAva:true, login:action.login, fileName:action.newFile}, (data)=> setProfile(data) )

    data.status === 200
    ? console.log(data)
    : console.log(data)

  })

}