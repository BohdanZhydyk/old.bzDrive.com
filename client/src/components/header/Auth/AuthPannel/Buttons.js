import React from 'react'

import { Button } from './Button'


export const Buttons = ({auth, fn})=>{
	return(
    <div className="btns flex wrap" >

      <Button props={{forms:auth.forms, active:true, fn}} />

      <Button props={{forms:auth.forms, active:false, fn}} />

    </div>
	)
}