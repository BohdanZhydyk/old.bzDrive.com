
let API = "https://oldapi.bzdrive.com/"

let tr_pl = {

	position:"WEB-programista",
	img:API+"img/CV/bz83.png",
	alt:"photo",

	left:[
		{	
			name:"ability",
			title:"WEB-TECHNOLOGIE",
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
			title:"JĘZYKI OBCE",
			content:[
				{el:"en", 	name:"angielski",	info:"B1"},
				{el:"pl", 	name:"polski",		info:"C1"},
				{el:"ru", 	name:"rosyjski",	info:"C2"},
				{el:"ua", 	name:"ukraiński",	info:"C2"},
			],
		},
		{
			name:"dataName",
			title:"DANE OSOBISTE",
			content:[
				{el:"tel", 			name:"telefon", 	info:"+48 667 927 157"},
				{el:"email", 		name:"e-mail", 		info:"bzua83@gmail.com"},
				{el:"home", 		name:"lokalizacja", info:"84-200 Wejherowo, Pomorskie, Polska"},
				{el:"site", 		name:"web-site", 	info:"bzDrive.com", 		link:"https://bzdrive.com"},
				{el:"linkedin", 	name:"LinkedIn", 	info:"in/bohdan-zhydyk", 	link:"https://www.linkedin.com/in/bohdan-zhydyk"},
				{el:"gitlab", 		name:"GitLab", 		info:"GitLab.com/bz83/", 	link:"https://gitlab.com/bz83/"},
			],
		},
	],

	right:[
		{
			name:"about",
			title:"O SOBIE",
			content:[
				{key:"p", value:"Dwa lata temu zainteresowałem się programowaniem webowym. To stało się moim hobby, cały wolny czas poświęcam programowaniu. Wiedzę zdobywam samodzielnie ze źródeł internetowych oraz w praktyce podczas pisania własnych projektów. Nie kopiuję cudzych osiągnięć, staram się zbudować algorytm i osobiście napisać kod."},

				{key:"p", value:"Znam następujące technologie:"},

					{key:"img", value:"PHP"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"HTML"},
					{key:"img", value:"CSS"},
					{key:"img", value:"JS"},

				{key:"p", value:"Studiuję samodzielnie:"},

					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"RESTAPI"},
					{key:"img", value:"EXPRESS"},
			],
		},
		{
			name:"myProjects",
			title:"MOJE PROJEKTY",
			content:[
				{key:"p", value:"Dziś mogę pochwalić się własnymi stronami, które stale rozwijam:"},

					{key:"a", value:"https://bzdrive.com"},
					{key:"img", value:"PHP"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"HTML"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Jest to aplikacja webowa, w której otwierają się inne aplikację webowe, po kliknięciu odpowiedniego przycisku w menu głównym. Obecnie strona służy głównie do zamieszczania aktualności i informacji o moich projektach."},

					{key:"a", value:"https://bistro.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Pracuję nad własnym projektem dla restauracji. W przyszłości ma się rozwinąć w aplikację webową, która będzie zarówno stroną restauracji, jak i systemem do zarządzania bazą danych, pracownikami, zamówieniami i środkami."},

					{key:"a", value:"https://api.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"NODE"},
					{key:"img", value:"RESTAPI"},
					{key:"img", value:"EXPRESS"},
					{key:"img", value:"jQuery"},
					{key:"img", value:"MySql"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Serwer, który będzie dostarczał informacji dla powyższych projektów."},

					{key:"a", value:"https://cv.bzdrive.com"},
					{key:"img", value:"REACT"},
					{key:"img", value:"CSS"},

				{key:"p", value:"Wersja online mojego CV, dostępna w czterech językach: EN, UA, PL, RU. Zawiera najbardziej aktualne informacje..."},
			],
		},
		{
			name:"motivation",
			title:"MOTYWACJA I PLANY",
			content:[
				{key:"p", value:"W programowaniu webowym widzę przyszłość i rozwój osobisty. Wiem, że nie mam doświadczenia komercyjnego w tej dziedzinie, ale wierzę, że umiejętność samodzielnego uczenia się połączona z pracą zespołową i chęć zdobywania nowych umiejętności, pozwoli szybko się rozwijać."},
			],
		},
		{
			name:"else",
			title:"INNE UMIEJĘTNOŚCI I ZAWODY",
			content:[
				{key:"p", value:"- Diagnostyka, naprawa, kodowanie, instalacja elektryki i elektroniki samochodowej."},
				{key:"div", value:"(15 lat)"},
				{key:"p", value:"- Montaż i obsługa domowych instalacji klimatyzacyjnych i wentylacyjnych."},
				{key:"div", value:"(3 lata)"},
				{key:"p", value:"- Projekt i instalacja elektryczności domowej."},
				{key:"div", value:"(4 lata)"},
				{key:"p", value:"- Instalacja i obsługa systemów Windows, Linux."},
				{key:"div", value:"(10 lat)"},
			],
		},
	],
}

export default tr_pl