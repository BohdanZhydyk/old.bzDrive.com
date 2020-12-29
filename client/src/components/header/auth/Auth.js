import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'

import { AuthPannel } from './AuthPannel'


const useStyles = createUseStyles({
  auth:{},
  ava:{
		border:'1px solid #999',
		borderRadius:'50%'
	}
})

export const Auth = ({auth, fn})=>{

	const styles = useStyles()

	return(
    <div className={classNames({ [styles.auth]:true, 'flex':true })}>
      
      <img className={classNames({ [styles.ava]:true, 'imgBtn':true })} alt="user"
					src="https://files.bzdrive.com/img/users/ava/man.png"
					onClick={ ()=>fn({ type:"TOGGLE_AUTH_PANNEL", payload:auth.active }) }
      />

      <AuthPannel auth={auth} fn={fn} />

    </div>
	)
}
