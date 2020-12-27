import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import $ from 'jquery'
import { Header } from './components/header/Header'
import { Main } from './components/main/Main'
import { Footer } from './components/footer/Footer'


function App(){

	const [state, setState] = useState("")

	if(state === ""){
		$.get('http://api.bzdrive.com/start', function(data){
			setState({...state, projects: data[0].projects, menu: data[0].menu, copyright: data[0].copyright})
		})
	}

	console.log(state)

	return(
		<div className="container">
		<BrowserRouter>
			
			<Header project={state.projects ? state.projects[0] : false} menu={state.menu} />
		
			<Main state={state} />
		
			<Footer projects={state.projects ? state.projects : false} copyright={state.copyright ? state.copyright : false} />
			
		</BrowserRouter>
		</div>
	)
}

export default App;
