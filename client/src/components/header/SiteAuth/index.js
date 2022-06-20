import React from 'react'
import { MenuPannel } from './MenuPannel'
import { AuthPannel } from './AuthPannel'
import { SiteNavigation } from '../SiteNavigation'


export const SiteAuth = ({ props:{user, side, nav, appFn} })=>{

	let AvaClick = ()=> appFn({type:"SIDE_CLICK", payload:{ava:!side.ava, menu:false} })
	let MenuClick = ()=> appFn({type:"SIDE_CLICK", payload:{ava:false, menu:!side.menu} })
	let BlurClick = ()=> appFn({type:"SIDE_CLICK", payload:{ava:false, menu:false} })

	let avaImg = `https://files.bzdrive.com/img/users/${user?.ava ? user.login : `man`}.png`
	let menuImg = "https://files.bzdrive.com/img/ico/icoMore.png"

	return(
		<>

			<div className="menuPannel flex end">
				<MenuPannel props={{user:false, avaImg, menuImg, AvaClick, MenuClick, appFn}} />
			</div>

			{
				(side.ava || side.menu) &&
				<div className="sidePannel flex column start">

					<MenuPannel props={{user, avaImg, menuImg, AvaClick, MenuClick, appFn}} />

					{ side.ava && <AuthPannel props={{user, appFn}} />}

					{
						side.menu &&
						<div className="siteNavigationWide flex column">
							<SiteNavigation props={{nav, user, appFn}}/>
						</div>
					}

				</div>
			}

		</>
	)
}

export default SiteAuth