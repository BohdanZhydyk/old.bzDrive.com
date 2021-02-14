import * as React from 'react'
import './Main.scss'

import { Photo } from './Photo/Photo'
import { Container } from './Container/Container'


export const Main = ({data})=>{
  return (
    <div className="main flex stretch" >
      
      <div className="mainL" >
      <Photo data={data.photo} />
      {
        data.containers.group1.map( (container, index) =>
          <Container data={container} key={container.name + index} />
        )
      }
      </div>

      <div className="mainR" >
      {
        data.containers.group2.map( (container, index) =>
          <Container data={container} key={container.name + index} />
        )
      }
      </div>

    </div>
  )
}