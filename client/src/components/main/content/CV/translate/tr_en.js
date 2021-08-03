
let API = "https://oldapi.bzdrive.com/"

let tr_en = {

	position:"WEB-programmer",
	img:API+"img/CV/bz83.png",
	alt:"photo",

	left:[
		{	
			name:"ability",
			title:"WEB-TECHNOLOGIES",
			content:[
				{el:"REACT", 		name:"React.js", 		info:""},
				{el:"NODE", 		name:"Node.js", 		info:""},
				{el:"EXPRESS", 	name:"Express.js", 	info:""},
				{el:"RESTAPI", 	name:"Rest API", 		info:""},
				{el:"GIT", 			name:"GIT", 				info:""},
			  {el:"jQuery", 	name:"jQuery", 			info:""},
				{el:"JS", 			name:"JavaScript", 	info:""},
			  {el:"PHP", 			name:"PHP", 				info:""},
			  {el:"MySql", 		name:"MySql", 			info:""},
			  {el:"CSS", 			name:"CSS", 				info:""},
				{el:"HTML", 		name:"HTML", 				info:""},
			],
		},
		{
			name:"languages",
			title:"FOREIGN LANGUAGES",
			content:[
				{el:"en", 	name:"english",		info:"B1"},
				{el:"pl", 	name:"polish",		info:"C1"},
				{el:"ru", 	name:"russian",		info:"C2"},
				{el:"ua", 	name:"ukrainian",	info:"C2"},
			],
		},
		{
			name:"dataName",
			title:"PERSONAL DATA",
			content:[
				{el:"tel", 			name:"phone", 				info:"+48 667 927 157"},
				{el:"email", 		name:"e-mail", 				info:"bzua83@gmail.com"},
				{el:"home", 		name:"localization", 	info:"84-200 Wejherowo, Pomorskie, Polska"},
				{el:"site", 		name:"web-site", 			info:"bzDrive.com", 			link:"https://bzdrive.com"},
				{el:"linkedin", name:"LinkedIn", 			info:"in/bohdan-zhydyk", 	link:"https://www.linkedin.com/in/bohdan-zhydyk"},
				{el:"gitlab", 	name:"GitLab", 				info:"GitLab.com/bz83/", 	link:"https://gitlab.com/bz83/"},
			],
		},
	],

	right:[
		{
			name:"about",
			title:"ABOUT MYSELF",
			content:[
				{key:"p", value:"Two years ago, I became interested in web programming. It has become my hobby, I dedicate all my free time to programming. I gain knowledge on my own from Internet sources, and in practice while writing my own projects. I do not copy other people's achievements, I try to build an algorithm and write the code personally."},

				{key:"p", value:"I know the following technologies:"},

					{key:"img", value:"PHP"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"HTML"},
					{key:"img", value:"CSS"},
					{key:"img", value:"JS"},

				{key:"p", value:"I study independently:"},

					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"RESTAPI"},
					{key:"img", value:"EXPRESS"},
			],
		},
		{
			name:"myProjects",
			title:"MY PROJECTS",
			content:[
				{key:"p", value:"Today I can boast of my own sites, which I am constantly developing:"},

					{key:"a", value:"https://bzdrive.com"},
					{key:"img", value:"PHP"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"HTML"},
					{key:"img", value:"CSS"},

				{key:"p", value:"This is a web-program that opens inside my other web-programs by clicking the appropriate button in the main menu. Currently, the site is mainly used to post news and information about my projects."},

					{key:"a", value:"https://bistro.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"CSS"},

				{key:"p", value:"I am working on my own project for a restaurant. In the future, it should develop into a web-program, which will be both a restaurant page and a system for managing the database, employees, orders and funds."},

					{key:"a", value:"https://api.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"RESTAPI"},
					{key:"img", value:"EXPRESS"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"CSS"},

				{key:"p", value:"A server that will provide information for the above projects."},

					{key:"a", value:"https://cv.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Online version of my CV, available in four languages: EN, UA, PL, RU. Contains the most up-to-date information..."},
			],
		},
		{
			name:"motivation",
			title:"MOTIVATION AND PLANS",
			content:[
				{key:"p", value:"I see the future and personal development in web programming. I know that I have no commercial experience in this field, but I believe that the ability to learn independently, combined with teamwork and a willingness to acquire new skills, will allow you to develop quickly."},
			],
		},
		{
			name:"else",
			title:"OTHER SKILLS AND PROFESSIONS",
			content:[
				{key:"p", value:"- Diagnosis, repair, coding, installation of automotive electricity and electronics."},
				{key:"div", value:"(15 years)"},
				{key:"p", value:"- Installation and operation of domestic air conditioning and ventilation systems."},
				{key:"div", value:"(3 years)"},
				{key:"p", value:"- Design and installation of household electricity."},
				{key:"div", value:"(4 years)"},
				{key:"p", value:"- Installation and support of Windows, Linux."},
				{key:"div", value:"(10 years)"},
			],
		},
	],
}

export default tr_en