import React from 'react'
import './SearchInput.scss'

import searchIcon from './../../imgs/search-icon.png'
import deleteIcon from './../../imgs/delete-icon.png'


export const SearchInput = ({data, actions})=>{

  let trend       = data.trend
  let placeholder = data.placeholder
  let value       = data.value
  let queries     = data.queries

  return(
    <div className="searchInput">

      <img className="searchImg" src={searchIcon} alt="search" />
      {
        value.length > 0 &&
        <img
          className="deleteImg"
          src={deleteIcon}
          alt="delete"
          onClick={ ()=> actions( {type:"CLEAR_INPUT", payload:""} ) }
        />
      }

      <input  type="text"
              placeholder={ placeholder }
              value={ value }
              onChange={ (e)=> actions( {type:"CHANGE_INPUT", payload:e.target.value} ) }
              onKeyDown={
                (e)=>{
                  if(e.key === "Enter"){ actions( {type:"CLICK_QUERY", payload:data.queries[0]} ) }
                }
              }
      />

      {
        data.search
        ?
        <div className="searchQueries">
        {
          queries.map( (item, index)=>{
            return(
              <div  className="searchQuery" key={ index+item.query }
                    onClick={ ()=> actions( {type:"CLICK_QUERY", payload:{query:item.query, photos:item.photos}} ) }
              >{ item.query }</div>
            )
          })
        }
        </div>
        :
        <div className="trending">{ `${trend[0]} ${trend[1]}, ${trend[2]}, ${trend[3]}, ${trend[4]}, ${trend[5]}` }</div>
      }

    </div>
  )
}
