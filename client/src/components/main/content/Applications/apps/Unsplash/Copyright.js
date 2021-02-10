import React from 'react'


export const Copyright = ({author})=>{
  return(
    <a className="copyright" href={`https://${author.site}` } target="_blank" rel="noreferrer">
      {`developed by: ${author.name} ${author.site}`}
    </a>
  )
}
