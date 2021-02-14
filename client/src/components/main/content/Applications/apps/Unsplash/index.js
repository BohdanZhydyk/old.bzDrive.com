import React, { useState } from 'react'
import './index.scss'

import {
	CHANGE_INPUT,
	CLEAR_INPUT,
	CLICK_QUERY,
	CLICK_PHOTO,
	SLIDER_BTN,
	CLOSE_WINDOW
} from './store/actions'

import { unsplashState } from './store/state'
import { Search } from './components/search/Search'
import { Photos } from './components/photos/Photos'


function UnsplashApp(){

	const [state, setState] = useState(unsplashState)

	console.log('unsplash', state)

	const actions = (action)=>{
    switch(action.type){
      case "CHANGE_INPUT":	CHANGE_INPUT( state, action.payload, setState );	break;
			case "CLEAR_INPUT":		CLEAR_INPUT	( state, action.payload, setState );	break;
			case "CLICK_QUERY":		CLICK_QUERY	( state, action.payload, setState );	break;
			case "CLICK_PHOTO":		CLICK_PHOTO	( state, action.payload, setState );	break;
			case "SLIDER_BTN":		SLIDER_BTN	( state, action.payload, setState );	break;
			case "CLOSE_WINDOW":	CLOSE_WINDOW( state, action.payload, setState );	break;
      default: break
    }
  }

	return(
		<div className="Unsplash">
			{
        state.photos.length === 0
        ? <Search state={ state } actions={actions} />
        : <Photos state={ state } actions={actions} />
      }
    </div>
	)
}

export default UnsplashApp