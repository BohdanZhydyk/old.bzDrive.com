import React, { useState, useEffect } from 'react'
import { HashRouter } from 'react-router-dom'

import initialState from './store/initialState.json'
import actions from './store/actions'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'


function App() {

	const [state, setState] = useState(initialState)

	const fn = (action) => actions(action, state, setState)
	
	useEffect( ()=>{ fn({ app: "drive", type: "GET_STATE" }) },[]);

	console.log('state', state)

	return (
		<HashRouter>

			<Header state={state} fn={fn} />

			<Main state={state} fn={fn} />

			<Footer state={state} />

		</HashRouter>
	)
}

export default App;
