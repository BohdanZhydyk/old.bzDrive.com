import React from 'react'
import './Search.scss'

import { BackGround } from './BackGround'
import { MainPannel } from './MainPannel'


export const Search = ({state, actions})=>{
	return(
		<div className="search">
			<BackGround img={state.main.bgImg} />
			<MainPannel data={state.main} actions={actions} />
		</div>
	)
}
