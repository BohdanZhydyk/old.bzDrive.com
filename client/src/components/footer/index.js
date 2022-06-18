import "./Footer.scss"
import { NoData } from "../All/NoData"

import { Cookie } from './Cookie'
import { Contacts } from './Contacts'
import { Copyright } from './Copyright'


const Footer = ({ props:{state, user, cookie, appFn} })=>{

  let saver = state ? false : true

  let contacts = saver ? ["Img", "Img", "Img", "Img", "Img"] : state.info.contacts
	let author = saver ? ["Txt", "Txt", "Txt", "Txt", "Txt"] : state.info.author
	let link = saver ? ["Txt"] : state.info.link

  return(
    <footer className="flex between wrap" style={cookie ? {} : {marginBottom:"5vw"}}>

      <div className="Contacts flex start">
				{ saver ? <NoData props={contacts} /> : <Contacts props={{contacts}} /> }
			</div>

      <div className="Copy flex end">
				{ saver ? <NoData props={author} /> : <Copyright props={{author, user, link}} /> }
			</div>

      
      { !cookie && <Cookie props={{user, cookie, appFn}} /> }
      
    </footer>
  )
}

export default Footer