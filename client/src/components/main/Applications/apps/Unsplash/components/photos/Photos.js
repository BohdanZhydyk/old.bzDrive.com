import React from 'react'
import './Photos.scss'

import { SearchInput } from './../search/SearchInput'
import { ModalWindow } from './modal/ModalWindow'


export const Photos = ({state, actions})=>{

	let input = state.main.input
	let photos = state.photos
	let modal = state.modal

	return(
		<div className="photos">

			<div className="photosTop flex">
				<SearchInput data={input} actions={actions} />
			</div>

			<div className="resPannel">{input.key}</div>

			<div className="tags flex wrap">
			{
				input.tags &&
				input.tags.map( (tag, index)=>{
					return(
						<div 	className="tagsQuery flex" key={ index+tag.text }
								onClick={ ()=> actions( {type:"CHANGE_INPUT", payload:tag.text} ) }
						>{ tag.text }</div>
					)
				})
			}
			</div>

			<div className="photosPannel flex wrap">
			{	
				photos &&
				photos.map( (item, index)=>{
					return(
						<div
							className="photoItem" key={ index+item.id }
							onClick={ ()=>actions( {type:"CLICK_PHOTO", payload:item} ) }
						>
							<img src={ item.link.small } alt="photoItem" />
						</div>
					)
				})
			}
			</div>

			{ modal.active && <ModalWindow modal={modal} actions={actions} /> }

		</div>
	)
}
