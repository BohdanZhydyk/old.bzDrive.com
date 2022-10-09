import axios from 'axios'
import { bzPost } from './../../../../state/functions'


export const GET_STATE = (action, setTraffic)=>{

  let query = {"date.unix":{ $gt:(Date.now() - action.int) }}

  bzPost("/getTraffic", { getState:true, query }, (data)=> setTraffic(data) )
  
}

export const SELECT_INT = (action, setTraffic, intervals, setIntervals)=>{

  setTraffic(false)
  setIntervals(intervals.map( (int)=> int.to === action.to ? {...int, act:true} : {...int, act:false} ))

  GET_STATE({int:action.to}, setTraffic)
  
}

export const LONG_PULLING = (action, setTraffic)=>{

  let query = {"date.unix":{ $gt:(Date.now() - action.int) }}

  // bzPost("/getTraffic", { longPulling:true, query }, (data)=>
  // console.log(data)
  // )

  async function subscribe() {
    let response = await axios.post("http://localhost:5000/getTraffic", {object:{longPulling:true}})
    console.log("newPull")
  
    if (response.status === 502) {
      // Status 502 is a connection timeout error,
      // may happen when the connection was pending for too long,
      // and the remote server or a proxy closed it
      // let's reconnect
      await subscribe()
    } else if (response.status !== 200) {
      // An error - let's show it
      console.log(response.statusText)
      // Reconnect in one second
      await new Promise(resolve => setTimeout(resolve, 1000))
      await subscribe()
    } else {
      // Get and show the message
      let message = await response.text()
      console.log(message)
      // Call subscribe() again to get the next message
      await subscribe()
    }
  }
  
  // subscribe()
  
}