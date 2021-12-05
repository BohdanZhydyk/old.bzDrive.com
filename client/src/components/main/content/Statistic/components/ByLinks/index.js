import React from 'react'

import './ByLinks.scss'


const ByLinks = ({statistic})=>{

  let links = [
    {name:"drive", count:statistic.filter( line => line.link === "/drive")},
    {name:"workshop", count:statistic.filter( line => line.link === "/workshop")},
    {name:"news", count:statistic.filter( line => line.link === "/news")},
    {name:"apps", count:statistic.filter( line => line.link === "/apps")},
    {name:"cv", count:statistic.filter( line => line.link === "/cv")},
    {name:"statistic", count:statistic.filter( line => line.link === "/statistic")},
    {name:"office", count:statistic.filter( line => line.link === "/office")},
    {name:"profile", count:statistic.filter( line => line.link === "/profile")}
  ]

  return(
    <div className="ByLinks flex column">
    {
      links.map( (line, nr)=>{

        let name = line.name
        let length = line.count.length
        let width = length * 100 / statistic.length


        return(
          <div className="line flex">
            <div className="lineL flex between">
              <span>{`${name}`}</span>
              <span>{ length }</span>
            </div>
            <div className="lineR">
              <div className="countLine flex" style={{width:`${width}%`}}>
                <span className="transparent">{ length }</span>
              </div>
            </div>
          </div>
        )
      })
    }
    </div>
  )
}

export default ByLinks