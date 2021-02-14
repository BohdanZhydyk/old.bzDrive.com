import React, { useState } from 'react'
import './index.scss'

import { bzPost } from '../../../../store/functions'

import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Footer } from './components/Footer/Footer'


function CvApp(){

  const [state, setState] = useState({
    "header": {
      "author": "Bohdan Zhydyk"
    },
    "main": {
      "photo": {
        "img": "https://files.bzdrive.com/img/CV/bz83.png",
        "text": "Web Developer"
      },
      "containers": {
        "group1": [
          {
            "name": "DANE OSOBISTE",
            "tags": [
              {
                "key": "infoLine",
                "value": {
                  "name": "LinkedIn",
                  "txt": "linkedin.com/in/bohdan-zhydyk",
                  "link": "https://linkedin.com/in/bohdan-zhydyk"
                }
              },
              {
                "key": "infoLine",
                "value": {
                  "name": "GitHub",
                  "txt": "github.com/BohdanZhydyk",
                  "link": "https://github.com/BohdanZhydyk"
                }
              },
              {
                "key": "infoLine",
                "value": {
                  "name": "Web-site",
                  "txt": "bzDrive.com",
                  "link": "https://bzDrive.com"
                }
              },
              {
                "key": "infoLine",
                "value": {
                  "name": "E-mail",
                  "txt": "bzua83@gmail.com",
                  "link": "mailto: bzua83@gmail.com"
                }
              },
              {
                "key": "infoLine",
                "value": {
                  "name": "Tel",
                  "txt": "+48 667 927 157",
                  "link": "tel:+48667927157"
                }
              },
              {
                "key": "infoLine",
                "value": {
                  "name": "Location",
                  "txt": "84-200 Wejherowo, Pomorskie",
                  "link": "https://www.google.com/maps/place/%D0%92%D0%B5%D0%B9%D0%B3%D0%B5%D1%80%D0%BE%D0%B2%D0%BE/@54.6049546,18.1985955,13z/data=!3m1!4b1!4m5!3m4!1s0x46fdba295e757655:0x27fe1a3923cf6cc7!8m2!3d54.6003216!4d18.2330488"
                }
              }
            ]
          },
          {
            "name": "WEB-TECHNOLOGIE",
            "tags": [
              {
                "key": "technologie",
                "value": "React.js"
              },
              {
                "key": "technologie",
                "value": "TypeScript"
              },
              {
                "key": "technologie",
                "value": "SCSS"
              },
              {
                "key": "technologie",
                "value": "JSS"
              },
              {
                "key": "technologie",
                "value": "Mongo.db"
              },
              {
                "key": "technologie",
                "value": "Node.js"
              },
              {
                "key": "technologie",
                "value": "Express.js"
              },
              {
                "key": "technologie",
                "value": "REST API"
              },
              {
                "key": "technologie",
                "value": "GIT"
              },
              {
                "key": "technologie",
                "value": "jQuery"
              },
              {
                "key": "technologie",
                "value": "JavaScript"
              },
              {
                "key": "technologie",
                "value": "PHP"
              },
              {
                "key": "technologie",
                "value": "MySQL"
              },
              {
                "key": "technologie",
                "value": "CSS"
              },
              {
                "key": "technologie",
                "value": "HTML"
              }
            ]
          },
          {
            "name": "JĘZYKI OBCE",
            "tags": [
              {
                "key": "language",
                "txt": "english",
                "value": "B1"
              },
              {
                "key": "language",
                "txt": "polish",
                "value": "C1"
              },
              {
                "key": "language",
                "txt": "ukrainian",
                "value": "C2"
              },
              {
                "key": "language",
                "txt": "russian",
                "value": "C2"
              }
            ]
          }
        ],
        "group2": [
          {
            "name": "O SOBIE",
            "tags": [
              {
                "key": "paragraph",
                "value": "Dwa lata temu zainteresowałem się programowaniem webowym. To stało się moim hobby, cały wolny czas poświęcam programowaniu. Wiedzę zdobywam samodzielnie ze źródeł internetowych oraz w praktyce podczas pisania własnych projektów. Nie kopiuję cudzych osiągnięć, staram się zbudować algorytm i osobiście napisać kod."
              },
              {
                "key": "paragraph",
                "value": "W programowaniu webowym widzę przyszłość i rozwój osobisty. Wiem, że nie mam doświadczenia komercyjnego w tej dziedzinie, ale wierzę, że umiejętność samodzielnego uczenia się połączona z pracą zespołową i chęć zdobywania nowych umiejętności, pozwoli szybko się rozwijać."
              }
            ]
          },
          {
            "name": "MOJE APLIKACJĘ",
            "tags": [
              {
                "key": "project",
                "name": "bzDrive.com",
                "link": "https://bzdrive.com",
                "tech": ["React.js","SCSS","Mongo.db","Node.js","Express.js"],
                "description": ["Jest to aplikacja webowa, w której otwierają się inne aplikację webowe, po kliknięciu odpowiedniego przycisku w menu głównym. Obecnie strona służy głównie do zamieszczania aktualności i informacji o moich projektach."]
              },
              {
                "key": "project",
                "name": "bzBistro",
                "link": "https://bzdrive.com/#/apps/bistro",
                "tech": ["React.js","SCSS","Mongo.db","Node.js","Express.js"],
                "description": ["Pracuję nad własnym projektem dla restauracji. W przyszłości ma się rozwinąć w aplikację webową, która będzie zarówno stroną restauracji, jak i systemem do zarządzania bazą danych, pracownikami, zamówieniami i środkami."]
              },
              {
                "key": "project",
                "name": "bzCV",
                "link": "https://bzdrive.com/#/cv",
                "tech": ["React.js","SCSS","Mongo.db","Node.js","Express.js"],
                "description": ["Wersja online mojego CV zawiera najbardziej aktualną informacje."]
              },
              {
                "key": "project",
                "name": "bzUnsplash",
                "link": "https://bzdrive.com/#/apps/unsplash",
                "tech": ["React.js","Node.js","SCSS","REST API"],
                "description": ["Wyszukiwarka zdjęc za pomocą servera Unsplash.com"]
              },
              {
                "key": "project",
                "name": "bzAPI",
                "link": "https://bzdrive.com/#/api",
                "tech": ["Node.js","Express.js","Mongo.db","REST API","React.js","SCSS"],
                "description": ["Serwer, który dostarcza informację dla powyższych projektów."]
              }
            ]
          },
          {
            "name": "INNE UMIEJĘTNOŚCI I ZAWODY",
            "tags": [
              {
                "key": "paragraph",
                "value": "- Diagnostyka, naprawa, kodowanie, instalacja elektryki i elektroniki samochodowej."
              },
              {
                "key": "paragraph",
                "value": "- Projektowanie i instalacja elektryczności domowej."
              },
              {
                "key": "paragraph",
                "value": "- Montaż i obsługa domowych instalacji klimatyzacyjnych i wentylacyjnych."
              },
              {
                "key": "paragraph",
                "value": "- Instalacja i obsługa systemów Windows, Linux."
              }
            ]
          }
        ]
      }
    },
    "footer": {
      "rodo1": "Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).",
      "rodo2": "Wyrażam również zgodę na przetwarzanie moich danych osobowych w celu prowadzenia przyszłych rekrutacji."
    }
  })

  if( state === "" ){ bzPost( {link:"/cv"}, (data)=> setState(data[0]) ) }

  console.log('cv', state)

	return(
		<div className="CV">
      {
        state !== "" &&
        <>
          <Header data={state.header} />
          <Main data={state.main} />
          <Footer data={state.footer} />
        </>
      }
    </div>
	)
}

export default CvApp