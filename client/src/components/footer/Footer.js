import React from 'react'
import $ from 'jquery'
import './Footer.css'


export const Footer = ({projects, copyright})=>{
	return(
		<footer>
			<div className="footerTop flex">
			{
				projects
				?
				projects.map( (project)=>{
					return(
						<a 	className="projectBtn flex" target="_blank" rel="noreferrer" key={ project.name }
							href={ "https://"+project.link[0]+project.link[1]+project.link[2]+project.link[3] } >
							<img className="imgBtn" src={ project.img } alt={ project.name } />
							<span className="projectName flex">
								<span>{ project.link[0] }</span><span className="txtOrg">{ project.link[1] }</span>
								<span>{ project.link[2] }</span><span className="txtOrg">{ project.link[3] }</span>
							</span>
						</a>
					)
				})
				:
				<div className="projectBtn flex">
					<div className="imgBtn noData"></div>
					<span className="projectName flex noData">--------</span>
				</div>
			}
			</div>

			<div className="footerBottom flex">
				<span className={ copyright ? `footerSpan` : `noData` }>{ copyright ? copyright.copy : `---` }</span>
				<span className="footerSpan">
					<span className={ copyright ? `txtOrg` : `noData` }>{ copyright ? copyright.author[0] : `--` }</span>
					<span className={ copyright ? `txtWht` : `noData` }>{ copyright ? copyright.author[1] : `-------` }</span>
					<span> </span>
					<span className={ copyright ? `txtOrg` : `noData` }>{ copyright ? copyright.author[2] : `--` }</span>
					<span className={ copyright ? `txtWht` : `noData` }>{ copyright ? copyright.author[3] : `-------` }</span>
				</span>
				<span className="footerSpan">
					<span className={ copyright ? `txtWht` : `noData` }>{ copyright ? copyright.link[0] : `---` }</span>
					<span className={ copyright ? `txtOrg` : `noData` }>{ copyright ? copyright.link[1] : `---` }</span>
					<span className={ copyright ? `txtWht` : `noData` }>{ copyright ? copyright.link[2] : `---` }</span>
					<span className={ copyright ? `txtOrg` : `noData` }>{ copyright ? copyright.link[3] : `---` }</span>
				</span>
				<span className={ copyright ? `footerSpan` : `noData` }>
					{ copyright ? `2018-${ new Date().getFullYear() }` : `---- ----` }
				</span>
			</div>
		</footer>
	)
}
