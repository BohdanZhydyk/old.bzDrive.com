import React from 'react'
import { MenuBtn } from './MenuBtn'
import { Auth } from './../auth/Auth'


export const Menu = ({btns, auth, user, fn})=>{
	return(
		<>
		{
			btns
			?
			<div className="headerR flex end" >

				{ btns.map( (btn, index)=> <MenuBtn btn={btn} key={ btn.to + index } /> ) }

				<Auth auth={auth} user={user} fn={fn} />
				
			</div>
			:
			<div className="headerR flex end" >

				{ [1,2,3,4].map( (item, index)=> <div className="headerMenuItems noData" key={`menuBtn${index}`} ></div> ) }

				<div className="imgBtn noData"></div>
				
			</div>
		}
		</>
	)
}
