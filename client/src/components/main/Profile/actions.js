import { bzDeleteFile, bzPost } from './../../../state/functions'


export const GET_PROFILE = (action, profile, setProfile)=>{
  let query = { getUsers:true, lim:1, query:{login:action.login}  }
  bzPost("/getProfile", query, (data)=> setProfile({...data[0], dealer:null}) )
}

export const GET_TRAFFIC = (action)=>{
  bzPost("/getProfile", { getTraffic:true, login:action.login }, (data)=> action.cb(data) )
}

export const GET_USERS = (action)=>{
  bzPost("/getProfile", { getUsers:true, lim:0, query:{} }, (data)=> action.cb(data) )
}

export const CHG_AVA = (action, profile, setProfile, appFn)=>{

  let query = action.query
  let fileAddr = action.fileAddr
  let oldFile = action.oldFile
  let newFile = action.newFile
  let cbData = action.cbData
  action.login = action.query[0].login

  bzPost("/getProfile", {chgAva:true, query, newFile}, (data)=>{
    GET_PROFILE(action, profile, setProfile)
    appFn({ type:"RELOAD_USER" })
    bzDeleteFile(fileAddr, oldFile, (data)=> console.log("deleteFile",data) )
  })

}