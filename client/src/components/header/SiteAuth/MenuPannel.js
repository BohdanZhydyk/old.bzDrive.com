import React from 'react'


export const MenuPannel = ({ props:{user, avaImg, menuImg, AvaClick, MenuClick, appFn} })=>{

	let lang = user?.lang
	let elseLang = ['en', 'pl', 'ua', 'ru'].filter( el=> el !== lang)

	return(

		<div className="menuPannel flex end">

			{
				user &&
				<div className="langPannel flex">

					{
						elseLang.map( (lang, i)=>{
							return(
								<LangBtn props={{lang:lang, active:false, appFn}} key={`LanguageBtn${i}`} />
							)
						})
					}

					<LangBtn props={{lang, active:true, appFn}} key={`LanguageBtn${0}`} />

				</div>
			}

			<img className="ava imgBtn flex" src={avaImg} alt="ava" onClick={ ()=> AvaClick() } />

			<img className="mainMenu imgBtn flex" src={menuImg} alt="more" onClick={ ()=> MenuClick() } />
			
		</div>

	)
}

const LangBtn = ({ props:{lang, active, appFn} })=>{

	let img = `https://files.bzdrive.com/img/ico/lng/lng${lang}.png`
	let classes = `${active ? `imgBtnBig` : `imgBtn`}`

	let LANG_CHG = ()=> !active && appFn({type:"LANG_CHG", payload:lang })

	return(
		<div className="flex" onClick={ ()=> LANG_CHG() }>
			<img className={classes} src={img} alt={lang} />
		</div>
	)
}