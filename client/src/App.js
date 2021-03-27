import React, { useState } from 'react'
import { HashRouter } from 'react-router-dom'

import actions from './store/actions'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'


function App() {

	const [state, setState] = useState("")

	const fn = (action) => actions(action, state, setState)

	if(state === ""){
		setState({
			drive: {
				info: false,
				nav: [
					{name: "", to: ""},
					{name: "", to: ""},
					{name: "", to: ""}
				],
				auth: false
			},
			user: false
		})

		fn({ app: "drive", type: "GET_STATE" })
	}

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
