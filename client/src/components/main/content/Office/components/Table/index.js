import React from 'react'
import './Table.scss'

import Line from './Line'
import Modes from './Modes'


const Table = ({ props:{mode, table, officeFn} })=>{

  return (
    <div className="table flex column">
    {
      table &&
      <>

        <Line props={{mode, line:table[0], nr:"top", officeFn}} />

        {
          table.map( (line, nr)=>{

            let modes = line.edi || line.pri ? true : false
            
            return(
              modes
              ? <Modes props={{mode, line, officeFn}} />
              : <Line props={{mode, line, nr, officeFn}} />
            )
          })
        }

      </>
    }
    </div>
  )
}

export default Table