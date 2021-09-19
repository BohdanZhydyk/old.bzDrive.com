import React from 'react'
import { HashRouter } from 'react-router-dom'

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'


const App = ()=>{
	return (
		<HashRouter
			hashType={"noslash"}
			// basename={"drive"}
			// getUserConfirmation={window.confirm("confirm message")}
		>

			<Header />

			<Main />

			<Footer />

		</HashRouter>
	)
}

export default App