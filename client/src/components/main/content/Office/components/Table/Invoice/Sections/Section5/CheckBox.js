import React from 'react'


export const CheckBox = ({ props:{data} })=>{
  return(
    <form className="flex">
    {
      data.map( (radio, nr)=>
        <div className="radio" key={`CheckBox${nr}`}>
          <input type="radio" id="html" name="fav_language" value={radio} />
          <label for="html">{radio}</label>
        </div>
      )
    }
    </form>
  )
}