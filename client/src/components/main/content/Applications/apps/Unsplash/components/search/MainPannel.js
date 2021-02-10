import React from 'react'
import { SearchInput } from './SearchInput'


export const MainPannel = ({data, actions})=>{
	return(
    <div className="mainPannel flex" >
      <div className="searchPannel">

        <div className="logo">{data.logoTxt}</div>

        <span>{ data.info[0] }</span>
        <a href={ data.info[3] } target="_blank" rel="noreferrer">{ data.info[1] }</a>

        <div>{ data.info[2] }</div>

        <SearchInput data={ data.input } actions={actions} />

      </div>
    </div>
	)
}
