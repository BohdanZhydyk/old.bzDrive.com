import React, { useState } from 'react'

import { Like } from './Like'
import { Users } from './Users'


const LikesPannel = ({ props:{item, user, newsFn} })=>{

  const [visible, setVisible] = useState(true)
  
  let id = item._id
  let login = user.login
  let likes = item.bottom.likes
  let include = likes.includes(login)

  let LIKE_CLICK = ()=>{
    include ? likes = likes.filter( (el)=> el !== login ) : likes.push(login)
    newsFn({ type:"LIKE_CLICK", payload:{id, likes} })
  }

  let VISIBLE = ()=> setVisible( !visible )

  return(
    <div className="likesPanel flex start">

      <Like props={{likes, include, VISIBLE, LIKE_CLICK}} />

      <Users props={{visible, likes}} />

    </div>
  )
}

export default LikesPannel