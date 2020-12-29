import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createUseStyles } from 'react-jss'
import $ from 'jquery'

import { Header } from './components/header/Header'
import { Main } from './components/main/Main'
import { Footer } from './components/footer/Footer'


const useStyles = createUseStyles({
	container:{}
})

function App(){

	const styles = useStyles()

	const [state, setState] = useState("")


	function fn(action){
		switch(action.type){

			case "AUTH_CLICK":
				setState({ ...state, auth:{...state.auth, active:!action.payload} })
				break

			case "CHG_FORM":
				setState(
					{
						...state,
						auth: {
							...state.auth,
							forms: state.auth.forms.map( (form)=>{
								return (
									form.txt === action.payload
									?	{...form, act:"y", inputs:form.inputs.map( (input)=>{ return {...input, val:"", error:""}  }) }
									:	{...form, act:"n", inputs:form.inputs}
								)
							})
						}
					}
				)
				break

			case "CHG_INPUT_VALUE":
				setState(
					{
						...state,
						auth: {
							...state.auth,
							forms: state.auth.forms.map( (form)=>{
								return (
									form.txt === action.payload.form
									? {
											...form,
											inputs: form.inputs.map( (input)=>{
												return (
													input.name === action.payload.name
													? {...input, val:action.payload.value}
													: {...input}
												)
											})
										}
									: {...form}
								)
							})
						}
					}
				)
				break

			case "SEND_FORM":
				let obj

				// state.auth.forms.map( (form)=>{
				// 	if(form.txt === action.payload){
				// 		obj = form.inputs.map( (input)=>{ return {input:input.name, value:input.val} })
				// 	}
				// 	return false
				// })

				// $.post('http://localhost:5000/auth', {form:action.payload, obj}, function(data){
				$.post('http://localhost:5000/login', {login: "", email: "Bитьz83@gmail.com", pass: " Mes"}, function(data){
					
					setState(
						{
							...state,
							auth: {
								...state.auth,
								forms: state.auth.forms.map( (form)=>{
									return (
										form.txt === action.payload
										? {
												...form,
												inputs: form.inputs.map( (input)=>{
													if(input.name === "login"){ return {...input, error:data.errors.login} }
													if(input.name === "email"){ return {...input, error:data.errors.email} }
													if(input.name === "pass")	{ return {...input, error:data.errors.pass} 	}
													if(input.name === "pass1"){ return {...input, error:data.errors.pass1} }
													if(input.name === "pass2"){ return {...input, error:data.errors.pass2} }
												})
											}
										: {...form}
									)
								})
							}
						}
					)

				})
				break

			default:
				break
		}
	}


	if(state === ""){
		$.get('https://api.bzdrive.com/start', function(data){
			setState({...state, projects: data[0].projects, auth: data[0].auth, copyright: data[0].copyright})
		})
	}

	// console.log('state', state)

	return(
		<div className={styles.container}>
		<BrowserRouter>
			
			<Header project={state.projects ? state.projects[0] : false} auth={state.auth} fn={fn} />
		
			<Main state={state} fn={fn} />
		
			<Footer projects={state.projects ? state.projects : false} copyright={state.copyright ? state.copyright : false} />
			
		</BrowserRouter>
		</div>
	)
}

export default App;
