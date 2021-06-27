import React from 'react'


export const Contacts = ({data, nr})=>{

  let classes = `contacts cell ${ nr === "top" && `black` } flex`

  return(
    <div className={classes}>
      {
        nr === "top"
        ? `Contacts`
        :
        <div className="flex column">
          <div>{data.tel}</div>
          <div>{data.www}</div>
          <div>{data.email}</div>
        </div>
      }
    </div>
  )
}