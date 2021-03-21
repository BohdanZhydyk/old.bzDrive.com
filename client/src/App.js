import React, { useState } from 'react'
import { HashRouter } from 'react-router-dom'

import initialState from './store/db/initialState.json'
import dbState from './store/db/dbState.json'
import actions from './store/actions'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'


function App() {

	const [state, setState] = useState(initialState)

	const fn = (action) => actions(action, state, setState)

//------------------------------------------

	!state.drive.info &&
	setTimeout(function(){
		setState(dbState)
	},1500)

	// if (state === false) { fn({ app: "drive", type: "GET_STATE" }) }

//------------------------------------------

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
