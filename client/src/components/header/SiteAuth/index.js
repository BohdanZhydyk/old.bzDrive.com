import React from 'react'

import { MenuPannel } from './MenuPannel'
import { AuthPannel } from './AuthPannel'
import { SiteNavigation } from '../SiteNavigation'


export const SiteAuth = ({ props:{user, side, nav, appFn} })=>{

	let AvaClick = ()=> appFn({type:"SIDE_CLICK", payload:{ava:!side.ava, menu:false} })
	let MenuClick = ()=> appFn({type:"SIDE_CLICK", payload:{ava:false, menu:!side.menu} })
	let BlurClick = ()=> appFn({type:"SIDE_CLICK", payload:{ava:false, menu:false} })

	let avaImg = `https://bzdrive.com/files/users/${user.ava ? user.ava : `male.png`}`
	let menuImg = "https://bzdrive.com/files/ico/icoMore.png"

	let sidePannelClasses = `sidePannel sidePannel-${(side.ava || side.menu) ? `open` : `close`} flex column start`

	return(
		<>

			<div className="menuPannel flex end">
				<MenuPannel props={{user:false, avaImg, menuImg, AvaClick, MenuClick, appFn}} />
			</div>

			<div className={sidePannelClasses}>

				{
					(side.ava || side.menu) &&
					<MenuPannel props={{user, avaImg, menuImg, AvaClick, MenuClick, appFn}} />
				}

				{ side.ava && <AuthPannel props={{user, appFn}} />}

				{
					side.menu &&
					<div className="siteNavigationWide flex column">
						<SiteNavigation props={{nav, user, appFn}}/>
					</div>
				}

			</div>

		</>
	)
}

export default SiteAuth