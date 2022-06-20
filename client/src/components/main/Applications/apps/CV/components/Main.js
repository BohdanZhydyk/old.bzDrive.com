import React from 'react'
import Photo from './Photo'
import Container from './Container'


export const Main = ({data})=>{
  return (
    <div className="main flex stretch" >
      
      <div className="mainL" >
        <Photo data={data.photo} />
        <Mapper data={data.containers.group1} />
      </div>

      <div className="mainR" >
        <Mapper data={data.containers.group2} />
      </div>

    </div>
  )
}

const Mapper = ({data})=>{
  return(
    <>
    { data.map( (container, index) => <Container data={container} key={container.name + index} /> ) }
    </>
  )
}