import "./Header.scss"
import { NoData } from "../All/NoData"
import { SiteLogo } from "./SiteLogo"
import { SiteNavigation } from "./SiteNavigation"
import SiteAuth from "./SiteAuth"


const Header = ({ props:{state, user, side, appFn} })=>{

	let saver = state ? false : true

	let info = saver ? ["Img", "Txt"] : state.info
	let nav = saver ? ["Txt", "Txt", "Txt"] : state.nav
	let auth = ["Img"]

  return(
    <header className="flex between">

			<div className="siteLogo flex start">
				{ saver ? <NoData props={info} /> : <SiteLogo props={{info}} /> }
			</div>
			
			<div className="siteNavigation flex end">
				{ saver ? <NoData props={nav} /> : <SiteNavigation props={{nav, user, appFn}} /> }
			</div>

			<div className="siteAuth flex end">
				{ saver ? <NoData props={auth} /> : <SiteAuth props={{user, side, nav, appFn}} /> }
			</div>

    </header>
  )
}

export default Header