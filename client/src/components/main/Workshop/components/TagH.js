import React from 'react'


export const TagH = ({ props:{body, user} })=>{
  return(
    <section className="tag">
      <h2 className="TagH flex center txtOrg">{body[user.lang]}</h2>
    </section>
  )
} 