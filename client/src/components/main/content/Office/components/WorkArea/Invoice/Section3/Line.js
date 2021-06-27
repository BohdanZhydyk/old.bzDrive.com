import React from 'react'


export const Line = ({line, index, nr}) => {
  return(
    <div className="line flex start" key={`Line${nr}${index}`}>
      {`${line.name} ${line.txt}`}
    </div>
  )
}