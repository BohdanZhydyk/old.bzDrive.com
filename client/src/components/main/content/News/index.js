import React, { useState } from 'react'
import './index.scss'

import {
  EDIT_MODE,
  CHANGE_INPUT
} from './actions'

import { bzPost } from '../../../../store/functions'
import { News } from './components/News'


function NewsApp(){

  const [state, setState] = useState("")
  
  if( state === "" ){
    bzPost( {link:"/news"}, (data)=> setState(data) )
  }

  function act(action){
    switch(action.type){
      case "EDIT_MODE": EDIT_MODE(action, state, setState); break;
      case "CHANGE_INPUT": CHANGE_INPUT(action, state, setState); break;
      default: break;
    }
  }
      
  console.log('news', state)

  return (
    <div className="news">
      {
        state !== "" &&
        state.map( (item, index)=> <News data={item} act={act} key={`news${index}${item._id}`} /> )
      }
    </div>
  )
}

export default NewsApp