import React, { useState } from 'react'
import './index.scss'

import { bzPost } from '../../../../store/functions'
import headerData from './store/headerData'
import mainData from './store/mainData'
import footerData from './store/footerData'

import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Footer } from './components/Footer/Footer'


function CvApp(){

  const [state, setState] = useState("")

  if( state === "" ){
    bzPost( {link:"/cv"}, (data)=> setState(data[0]) )
  }

  console.log('cv', state)

	return(
		<div className="CV">
      {
        state !== "" &&
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