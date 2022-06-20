import React from 'react'


export const TagUl = ({ props:{body, user} })=>{
  return(
    <section className="tag">
      <ul className="TagUl">
        <span>{body[user.lang].ul}</span>
        {
          body[user.lang].li.map( (li, nr)=>
            <li className="li" key={`li${nr}`}>{li}</li>
          )
        }
      </ul>
    </section>
  )
}