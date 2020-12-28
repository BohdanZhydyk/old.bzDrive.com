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
									? form = {txt:form.txt, act:"y", inputs:form.inputs}
									: form = {txt:form.txt, act:"n", inputs:form.inputs}
								)
							})
						}
					}
				)
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
		
			<Main state={state} />
		
			<Footer projects={state.projects ? state.projects : false} copyright={state.copyright ? state.copyright : false} />
			
		</BrowserRouter>
		</div>
	)
}

export default App;
