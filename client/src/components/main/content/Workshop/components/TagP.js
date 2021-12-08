import React from 'react'

export const TagP = ({ props:{body, user} })=>{
  return(
    <section className="tag">
      <div className="TagP flex">

        {body.startImg && <img src={body.startImg} alt="startImg" />}

        <p>{body.txt[user.lang]}</p>

        {body.endImg && <img src={body.endImg} alt="endImg" />}

      </div>
    </section>
  )
} 