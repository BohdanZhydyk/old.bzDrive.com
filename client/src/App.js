import React, { useState, useEffect } from 'react'
import { HashRouter } from 'react-router-dom'

import { actions } from './actions'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'


const App = ()=>{

	const [state, setState] = useState(false)

	const fn = (action)=> actions(action, state, setState)
	
	useEffect( ()=>{ !state && fn({ type:"GET_STATE" }) },[])

	console.log('state', state)

	return (
		<HashRouter
			// basename={"drive"}
			// getUserConfirmation={window.confirm("confirm message")}
			hashType={"noslash"}
		>

			<Header state={state} fn={fn} />

			<Main state={state} fn={fn} />

			<Footer state={state} fn={fn} />

		</HashRouter>
	)
}

export default App;
