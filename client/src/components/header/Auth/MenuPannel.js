import React from 'react'
import AuthPannel from './AuthPannel'
import { UserNavigation } from './UserNavigation'


export const MenuPannel = ({auth, user, fn})=>{
	return(
		<div className="menuPannel">
			{ 
				user.role === "guest"
				?
					<>
						<AuthPannel auth={auth} fn={fn} />
						<UserNavigation menu={auth.usermenu} fn={fn} />
					</>
				:
					<>
						<div className="menuBtn menuBtnExit flex end"
								onClick={ ()=>fn({ app:"drive", type:"EXIT_MENU" }) }
						>logout</div>
						<UserNavigation menu={auth.usermenu} fn={fn} />
					</>
			}
		</div>
	)
}
