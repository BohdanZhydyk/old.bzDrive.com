import React from 'react'
import './index.scss'

import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Footer } from './components/Footer/Footer'


function CvApp({state, fn}){

  if( !state ){ fn({ app:"cv", type:"GET_STATE" }) }

	return(
		<div className="CV">
      {
        state &&
        <>
          <Header data={state.header} />
          <Main data={state.main} />
          <Footer data={state.footer} />
        </>
      }
    </div>
	)
}

export default CvApp