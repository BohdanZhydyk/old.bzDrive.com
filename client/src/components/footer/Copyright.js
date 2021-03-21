import React from 'react'


export const Copyright = ({info})=>{
  return (
    <div className="right flex end">
      {
        info
        ?
        <>
          <Author author={info.author} />
          <Link link={info.link} />
          <Year />
        </>
        :
        [1,2].map( (i)=> <div className="noData noDataTxt" key={`copy${i}`} ></div> )
      }
    </div>
  )
}

const Author = ({author})=>{

  let color = false

  return(
    <span className="footerSpan">
    {
      author.map( (item, index)=>{
        color = !color
        return(
          <span className={color ? `txtWht`: `txtOrg margin`} key={`author${index}`}>
            {item}
          </span>
        )
      })
    }
    </span>
  )
}

const Link = ({link})=>{

  let color = false
  
  return(
    <span className="footerSpan">
    {
      link.map( (item, index)=>{
        color = !color
        return(
          <span className={color ? `txtOrg`: `txtWht`} key={`link${index}`}>
            {item}
          </span>
        )
      })
    }
    </span>
  )
}

const Year = ()=> <span className="footerSpan">{`2018-${ new Date().getFullYear() }`}</span>