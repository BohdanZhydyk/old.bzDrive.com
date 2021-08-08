import React from 'react'
import './Statistic.scss'


const StatisticApp = ()=>{

  // if( !state ){ fn({ app:"statistic", type:"GET_STATE" }) }

  // let table = []
  // if(state){
  //   table = state.map( (item, index)=>{
  //     return {id:index, user:item.user, IP:item.IP.ip}
  //   })
  // }

  return(
    <div className="statistic flex column">
      Statistic
      {/* {
        state &&
        table.map( (item, index)=>{
          return(
            <div>{`id: ${item.id} | user: ${item.user.login} | IP: ${item.IP}`}</div>
          )
        })
      } */}
    </div>
  )
}

export default StatisticApp