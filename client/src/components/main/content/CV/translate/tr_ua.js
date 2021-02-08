
let API = "https://oldapi.bzdrive.com/"

let tr_ua = {

	position:"WEB-програміст",
	img:API+"img/CV/bz83.png",
	alt:"photo",

	left:[
		{	
			name:"ability",
			title:"ВЕБ-ТЕХНОЛОГІЇ",
			content:[
				{el:"REACT", 		name:"React.js", 	info:""},
				{el:"NODE", 		name:"Node.js", 	info:""},
				{el:"EXPRESS", 		name:"Express.js", 	info:""},
				{el:"RESTAPI", 		name:"Rest API", 	info:""},
				{el:"GIT", 			name:"GIT", 		info:""},
			    {el:"jQuery", 		name:"jQuery", 		info:""},
				{el:"JS", 			name:"JavaScript", 	info:""},
			    {el:"PHP", 			name:"PHP", 		info:""},
			    {el:"MySql", 		name:"MySql", 		info:""},
			    {el:"CSS", 			name:"CSS", 		info:""},
				{el:"HTML", 		name:"HTML", 		info:""},
			],
		},
		{
			name:"languages",
			title:"ІНОЗЕМНІ МОВИ",
			content:[
				{el:"en", 	name:"англійська",	info:"B1"},
				{el:"pl", 	name:"польська",	info:"C1"},
				{el:"ru", 	name:"російська",	info:"C2"},
				{el:"ua", 	name:"українська",	info:"C2"},
			],
		},
		{
			name:"dataName",
			title:"ОСОБИСТІ ДАНІ",
			content:[
				{el:"tel", 			name:"телефон", 	info:"+48 667 927 157"},
				{el:"email", 		name:"e-mail", 		info:"bzua83@gmail.com"},
				{el:"home", 		name:"локалізація", info:"84-200 Wejherowo, Pomorskie, Polska"},
				{el:"site", 		name:"web-site", 	info:"bzDrive.com", 		link:"https://bzdrive.com"},
				{el:"linkedin", 	name:"LinkedIn", 	info:"in/bohdan-zhydyk", 	link:"https://www.linkedin.com/in/bohdan-zhydyk"},
				{el:"gitlab", 		name:"GitLab", 		info:"GitLab.com/bz83/", 	link:"https://gitlab.com/bz83/"},
			],
		},
	],

	right:[
		{
			name:"about",
			title:"ПРО СЕБЕ",
			content:[
				{key:"p", value:"Два роки тому я захопився веб-програмуванням. Це стало моїм хобі, я весь свій вільний час присвячую програмуванню. Здобуваю знання самостійно з інтернет джерел, та на практиці під час написання власних проектів. Не копіюю чужих досягнень, стараюся збудувати алгоритм та написати код особисто."},

				{key:"p", value:"Знаю наступні технології:"},

					{key:"img", value:"PHP"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"HTML"},
					{key:"img", value:"CSS"},
					{key:"img", value:"JS"},

				{key:"p", value:"Вивчаю самостійно:"},

					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"RESTAPI"},
					{key:"img", value:"EXPRESS"},
			],
		},
		{
			name:"myProjects",
			title:"МОЇ ПРОЕКТИ",
			content:[
				{key:"p", value:"На сьогоднішній день можу похвалитися власними сайтами, які безперервно розвиваю:"},

					{key:"a", value:"https://bzdrive.com"},
					{key:"img", value:"PHP"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"HTML"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Це web-програма, яка відкриває усередині інші мої web-програми по кліку відповідної кнопки в головному меню. Зараз сайт використовується переважно для розміщення новин та інформації відносно моїх проектів."},

					{key:"a", value:"https://bistro.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Працюю над власним проектом для ресторану. В майбутньому він повинен розвинутися в web-програму, яка буде одночасно сторінкою ресторану, та системою для управління базою даних, працівників, замовлень та коштів."},

					{key:"a", value:"https://api.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"RESTAPI"},
					{key:"img", value:"EXPRESS"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Сервер, який надаватиме інформацію для вищезазначених проектів."},

					{key:"a", value:"https://cv.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Online версія мого CV, доступна на чотирьох мовах: EN, UA, PL, RU. Містить максимально актуальну інформацію..."},
			],
		},
		{
			name:"motivation",
			title:"МОТИВАЦІЯ ТА ПЛАНИ",
			content:[
				{key:"p", value:"Бачу майбутнє та особистий розвиток у веб-програмуванні. Я знаю, що у мене немає комерційного досвіду в цій галузі, але вірю, що здатність вчитися самостійно, поєднана з роботою в команді та готовність набувати нових навичок, дозволить швидко розвиватися."},
			],
		},
		{
			name:"else",
			title:"ІНШІ НАВИЧКИ ТА ПРОФЕСІЇ",
			content:[
				{key:"p", value:"- Діагностика, ремонт, кодування, монтаж автомобільної електрики та електроніки."},
				{key:"div", value:"(15 років)"},
				{key:"p", value:"- Встановлення та експлуатація побутових систем кондиціонування та вентиляції."},
				{key:"div", value:"(3 роки)"},
				{key:"p", value:"- Проектування та монтаж побутової електрики."},
				{key:"div", value:"(4 роки)"},
				{key:"p", value:"- Встановлення та підтримка ОС Windows, Linux."},
				{key:"div", value:"(10 років)"},
			],
		},
	],
}

export default tr_ua