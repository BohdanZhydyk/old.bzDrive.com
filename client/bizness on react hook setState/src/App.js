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
	CHANGE_INPUT_VALUE,
	// SEND_FORM
} from './store/actions'

import {
	getInputValue,
	setInputError
} from './store/functions'


function App(){

	const [state, setState] = useState("")
	// const [handShake, handShakeState] = useState("")

	
	function setHandShake(state){
		
		let IP
		let handShakeNEW
		let handShakeOLD = JSON.parse( localStorage.getItem('handShake') )

		axios.get('http://ip-api.com/json').then( res => {
			IP = {
				ip: res.data.query,
				zip: res.data.zip,
				code: res.data.countryCode,
				country: res.data.country,
				region: res.data.regionName,
				city: res.data.city,
				name: res.data.as,
				// isp: "TKCHOPIN"
				// lat: 54.6037
				// lon: 18.2503
				// org: "CHOPIN Telewizja Kablowa"
				// region: "22"
				// status: "success"
				// timezone: "Europe/Warsaw"
			}
		})
		.then(function(){ axios.post( api+'/handshake', {handShakeOLD, IP} ).then( res => {
				handShakeNEW = res.data
			})
			.then(function(){
				// handShakeState( handShakeNEW )
				localStorage.setItem('handShake', JSON.stringify( handShakeNEW ) )
			})
		})

	}



	function getStateAPI(){
		axios.get( api+'/start' ).then(res => {
			setState({
				...state,
				projects: res.data[0].projects,
				auth: res.data[0].auth,
				copyright: res.data[0].copyright
			})
			
		})
		.then(function(){
			setHandShake()
		})
	}
	


	if(state === ""){
		getStateAPI()
	}


	function fn(action){
		switch(action.type){
			case "TOGGLE_AUTH_PANNEL": 	setState( TOGGLE_AUTH_PANNEL(state, action) ); 	break
			case "TOGGLE_FORM": 				setState( TOGGLE_FORM(state, action) ); 				break
			case "CHANGE_INPUT_VALUE":  setState( CHANGE_INPUT_VALUE(state, action) ); 	break
			case "SEND_FORM":

				let newState

				let SEND_FORM = (state, action)=>{
					
					const sendForm = new Promise(function(resolve, reject){
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
						).then( res=>{
							newState = {
								...state,
								auth: {
									...state.auth,
									forms: state.auth.forms.map( (form)=>{
										return (
											form.txt === action.payload
											? {
													...form,
													inputs: form.inputs.map( (input)=>{
														if(input.name === "login"){ return {...input, error:res.data.login} }
														if(input.name === "email"){ return {...input, error:res.data.email} }
														if(input.name === "pass")	{ return {...input, error:res.data.pass} 	}
														if(input.name === "pass1"){ return {...input, error:res.data.pass1} }
														if(input.name === "pass2"){ return {...input, error:res.data.pass2} }
													})
												}
											: {...form}
										)
									})
								}
							}
							resolve(newState)
						})
						
					})
					sendForm.then(function(){ setState( newState ) })
				}

				SEND_FORM(state, action)
				
				break
			default: break
		}
	}


	console.log('state', state)
	// console.log('handShake', handShake)



	return(
		<>
		<BrowserRouter>
			
			<Header project={state.projects ? state.projects[0] : false} auth={state.auth} fn={fn} />
		
			<Main state={state}  fn={fn} />
			{/* handShake={handShake} */}
		
			<Footer projects={state.projects ? state.projects : false} copyright={state.copyright ? state.copyright : false} />
			
		</BrowserRouter>
		</>
	)
}

export default App;
