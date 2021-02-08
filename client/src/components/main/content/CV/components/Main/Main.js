import * as React from 'react'
import './Main.scss'

import { Photo } from './Photo/Photo'
import { ContainerL } from './ContainerL/ContainerL'
import { ContainerR } from './ContainerR/ContainerR'


export const Main = ({ data: {photo, containers, informations} })=>{
  return (
    <div className="main flex stretch" >
      
      <div className="mainL" >
        <Photo data={photo} />
        {
          containers.map( (container, index) =>
            <ContainerL data={container} key={container.name + index} />
          )
        }
      </div>

      <div className="mainR" >
        {
          informations.map( (info, index)=>
            <ContainerR data={info} key={info.name + index} />
          )
        }
      </div>

    </div>
  )
}