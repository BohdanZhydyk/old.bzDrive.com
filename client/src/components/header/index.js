import React from 'react'
import "./Header.scss"
import { NoData } from "../All/NoData"
import { SiteLogo } from "./SiteLogo"
import { SiteNavigation } from "./SiteNavigation"
import SiteAuth from "./SiteAuth"


const Header = ({ props:{state, user, side, appFn} })=>{

	let info = state ? state.info : ["Img", "Txt"]
	let nav = state ? state.nav : ["Txt", "Txt", "Txt"]
	let auth = ["Img"]

  return(
    <header className="flex between">

			<div className="siteLogo flex start">
				{ state ? <SiteLogo props={{info}} /> : <NoData props={info} /> }
			</div>
			
			<div className="siteNavigation flex end">
				{ state ? <SiteNavigation props={{nav, user, appFn}} /> : <NoData props={nav} /> }
			</div>

			<div className="siteAuth flex end">
				{ state ? <SiteAuth props={{user, side, nav, appFn}} /> : <NoData props={auth} /> }
			</div>

    </header>
  )
}

export default Header