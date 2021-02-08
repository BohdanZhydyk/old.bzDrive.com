import * as React from 'react'
import './Header.scss'


export const Header = ({data})=>{
  return (
    <div className="header flex">
      {data.author}
    </div>
  )
}