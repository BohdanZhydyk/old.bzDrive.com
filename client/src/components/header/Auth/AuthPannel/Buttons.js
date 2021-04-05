import React from 'react'

import { Button } from './Button'


export const Buttons = ({auth, lang, fn})=>{
	return(
    <div className="btns flex wrap" >

      <Button props={{forms:auth.forms, lang, active:true, fn}} />

      <Button props={{forms:auth.forms, lang, active:false, fn}} />

    </div>
	)
}