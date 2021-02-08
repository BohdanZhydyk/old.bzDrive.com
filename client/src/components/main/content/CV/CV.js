import React from 'react'
import './CV.scss'

import headerData from './store/headerData'
import mainData from './store/mainData'
import footerData from './store/footerData'

import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Footer } from './components/Footer/Footer'


export const CV = ()=>{
	return(
		<div className="CV">
      
      <Header data={headerData} />

      <Main data={mainData} />

      <Footer data={footerData} />

    </div>
	)
}
