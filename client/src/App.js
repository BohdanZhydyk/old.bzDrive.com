import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import { Header } from './components/header/Header'
import { Main } from './components/main/Main'
import { Footer } from './components/footer/Footer'

import { api } from './store/variables'
import {
	TOGGLE_AUTH_PANNEL,
	TOGGLE_FORM,
	CHANGE_INPUT_VALUE
} from './store/actions'
import {
	getInputValue,
	setInputError
} from './store/functions'


function App(){

	const [state, setState] = useState("")

	if(state === ""){
		axios.get( api+'/start' )
		.then(res => {
			setState({
				...state,
				projects: res.data[0].projects,
				auth: res.data[0].auth,
				copyright: res.data[0].copyright
			})
		})
	}

	console.log('state', state)

	function fn(action){
		switch(action.type){
			case "TOGGLE_AUTH_PANNEL": 	setState( TOGGLE_AUTH_PANNEL(state, action) ); 	break
			case "TOGGLE_FORM": 				setState( TOGGLE_FORM(state, action) ); 				break
			case "CHANGE_INPUT_VALUE":  setState( CHANGE_INPUT_VALUE(state, action) ); 	break
			case "SEND_FORM":
				axios.post(
					api+'/auth',
					{
						login:getInputValue(state, action.payload, 'login'),
						email:getInputValue(state, action.payload, 'email'),
						pass :getInputValue(state, action.payload, 'pass' ),
						pass1:getInputValue(state, action.payload, 'pass1'),
						pass2:getInputValue(state, action.payload, 'pass2'),
						form:action.payload
					}
				)
				.then(res => {
					console.log(res.data)
					setState( setInputError(state, action, res.data) )
		    	if(res.data.ok){ console.log(res.data); alert(res.data.msg) }
				})
				break
			default: break
		}
	}

	return(
		<>
		<BrowserRouter>
			
			<Header project={state.projects ? state.projects[0] : false} auth={state.auth} fn={fn} />
		
			<Main state={state} fn={fn} />
		
			<Footer projects={state.projects ? state.projects : false} copyright={state.copyright ? state.copyright : false} />
			
		</BrowserRouter>
		</>
	)
}

export default App;
