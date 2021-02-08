
let API = "https://oldapi.bzdrive.com/"

let tr_ru = {

	position:"WEB-программист",
	img:API+"img/CV/bz83.png",
	alt:"photo",

	left:[
		{	
			name:"ability",
			title:"ВЕБ-ТЕХНОЛОГИИ",
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
			title:"ИНОСТРАННЫЕ ЯЗЫКИ",
			content:[
				{el:"en", 	name:"английский",	info:"B1"},
				{el:"ua", 	name:"украинский",	info:"C2"},
				{el:"pl", 	name:"польский",	info:"C1"},
				{el:"ru", 	name:"русский",		info:"C2"},
			],
		},
		{
			name:"dataName",
			title:"ЛИЧНЫЕ ДАННЫЕ",
			content:[
				{el:"tel", 			name:"телефон", 	info:"+48 667 927 157"},
				{el:"email", 		name:"e-mail", 		info:"bzua83@gmail.com"},
				{el:"home", 		name:"локализация", info:"84-200 Wejherowo, Pomorskie, Polska"},
				{el:"site", 		name:"web-site", 	info:"bzDrive.com", 		link:"https://bzdrive.com"},
				{el:"linkedin", 	name:"LinkedIn", 	info:"in/bohdan-zhydyk", 	link:"https://www.linkedin.com/in/bohdan-zhydyk"},
				{el:"gitlab", 		name:"GitLab", 		info:"GitLab.com/bz83/", 	link:"https://gitlab.com/bz83/"},
			],
		},
	],

	right:[
		{
			name:"about",
			title:"О СЕБЕ",
			content:[
				{key:"p", value:"Два года назад я увлекся веб-программированием. Это стало моим хобби, я все свое свободное время посвящаю программированию. Приобретаю знания самостоятельно с интернет источников, и на практике при написании собственных проектов. Не копируйте чужих достижений, стараюсь построить алгоритм и написать код лично."},

				{key:"p", value:"Знаю следующие технологии:"},

					{key:"img", value:"PHP"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"HTML"},
					{key:"img", value:"CSS"},
					{key:"img", value:"JS"},

				{key:"p", value:"Изучаю самостоятельно:"},

					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"RESTAPI"},
					{key:"img", value:"EXPRESS"},
			],
		},
		{
			name:"myProjects",
			title:"МОИ ПРОЕКТЫ",
			content:[
				{key:"p", value:"На сегодняшний день могу похвастаться собственными сайтами, которые непрерывно развиваю:"},

					{key:"a", value:"https://bzdrive.com"},
					{key:"img", value:"PHP"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"HTML"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Это web-приложение, которое открывает внутри другие мои web-программы по клику соответствующей кнопки в главном меню. Сейчас сайт используется преимущественно для размещения новостей и информации относительно моих проектов."},

					{key:"a", value:"https://bistro.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Работаю над собственным проектом для ресторана. В будущем он должен развиться в web-программу, которая будет одновременно страницей ресторана, и системой для управления базой данных, работников, заказов и средств."},

					{key:"a", value:"https://api.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"RESTAPI"},
					{key:"img", value:"EXPRESS"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Сервер, который будет предоставлять информацию для вышеупомянутых проектов."},

					{key:"a", value:"https://cv.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Online версия моего CV, доступна на четырех языках: EN, UA, PL, RU. Содержит максимально актуальную информацию..."},
			],
		},
		{
			name:"motivation",
			title:"МОТИВАЦЫЯ И ПЛАНЫ",
			content:[
				{key:"p", value:"Вижу будущее и личное развитие в веб-программировании. Я знаю, что у меня нет коммерческого опыта в этой области, но верю, что способность учиться самостоятельно, соединенная с работой в команде и готовность приобретать новые навыки, позволит быстро развиваться."},
			],
		},
		{
			name:"else",
			title:"ДРУГИЕ НАВЫКИ И ПРОФЕССИИ",
			content:[
				{key:"p", value:"- Диагностика, ремонт, кодирование, монтаж автомобильной электрики и электроники."},
				{key:"div", value:"(15 лет)"},
				{key:"p", value:"- Установка и эксплуатация бытовых систем кондиционирования и вентиляции."},
				{key:"div", value:"(3 года)"},
				{key:"p", value:"- Проектирование и монтаж бытовой електрики."},
				{key:"div", value:"(4 года)"},
				{key:"p", value:"- Установка и поддержка ОС Windows, Linux."},
				{key:"div", value:"(10 лет)"},
			],
		},
	],
}

export default tr_ru