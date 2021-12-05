import React from 'react'

export const TagP = ({ props:{body, user} })=>{
  return(
    <section className="tag">
      <p className="TagP">{body[user.lang]}</p>
    </section>
  )
} 