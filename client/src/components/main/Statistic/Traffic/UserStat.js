import React from 'react'

import { GroupArrBy } from '../../../../state/functions'


export const UserStat = ({ props:{userTraffic} })=>{

  let GroupTraffic = GroupArrBy(userTraffic, "IP", "from").sort((a, b) => a.key.localeCompare(b.key))

  return(
    <div className="UserStat flex wrap">
      {
        GroupTraffic.map( (el, i)=>{
          return(
            <div className="UserStatEl flex">
              <span className="count flex">{`${el.value.length}`}</span>
              <span>{`${el.key}`}</span>
            </div>
          )
        })
      }
    </div>
  )
}