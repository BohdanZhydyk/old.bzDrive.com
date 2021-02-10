import React from 'react'
import './ModalWindow.scss'

import leftIcon from './../../../imgs/left-icon.png'
import rightIcon from './../../../imgs/right-icon.png'

import { SliderBtn } from './SliderBtn'
import { Top } from './Top'
import { Prewiew } from './Prewiew'
import { Bottom } from './Bottom'


export const ModalWindow = ({modal, actions})=>{
	return(
		<div className="window flex stretch">

			<SliderBtn dir="left" id={modal.id} icon={leftIcon} actions={actions} />

			<div className="photoArea">
				<Top data={modal} actions={actions} />
				<Prewiew data={modal} actions={actions} />
				<Bottom data={modal} actions={actions} />
			</div>
			
			<SliderBtn dir="right" id={modal.id} icon={rightIcon} actions={actions} />

		</div>
	)
}
