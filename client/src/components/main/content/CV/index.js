import React from 'react'
import './index.scss'

import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Footer } from './components/Footer/Footer'
import Loader from './../Loader'


const CvApp = ({content, user, fn})=>{

  if( !content ){ fn({ app:"cv", type:"GET_STATE" }) }

  return (
    <div className="CV">
      {
        content
        ?
        <>
          <Header data={content.header} />
          <Main data={content.main} />
          <Footer data={content.footer} />
        </>
        :
        <Loader />
      }
    </div>
  )
}

export default CvApp