import React from "react"

import {
  errName,
  errZIP,
  errTown,
  errStreet,
  errNIP,
  errBrand,
  errModel,
  errFaults,
  errTel,
  errNumbers
} from "../../../../../../../store/functions"
import { Input } from "./Input"


export const ElInfo = ({ props:{mode, car, dealer, buyer, edit, AreaFn} })=>{

  let firmInfo = (title, txt, info)=>{
    return [
      [title],
      [
        {
          form:`${txt}Name`,
          type:"text",
          legend:"nazwa",
          style:"infoName",
          val:( (info?.name !== "Nabywca" && info?.name !== "Klient") ? info.name : "" ),
          error: mode === "FS" && errName( (info?.name !== "Nabywca" && info?.name !== "Klient") ? info.name : "" )
        }
      ],
      [
        {
          form:`${txt}ZIP`,
          type:"text",
          legend:"kod pocztowy",
          val:(info?.addr?.zip ? info.addr.zip : ""),
          error: mode === "FS" && errZIP( info?.addr?.zip )
        },
        {
          form:`${txt}Town`,
          type:"text",
          legend:"miejscowość",
          val:(info?.addr?.town ? info.addr.town : ""),
          error: mode === "FS" && errTown( info?.addr?.town )
        },
        {
          form:`${txt}Street`,
          type:"text",
          legend:"ulica",
          val:(info?.addr?.street ? info.addr.street : ""),
          error: mode === "FS" && errStreet( info?.addr?.street )
        }
      ],
      [
        {
          form:`${txt}Www`,
          type:"text",
          legend:"strona internetowa",
          val:(info?.contacts?.www ? info.contacts.www : "")
        }
      ],
      [
        {
          form:`${txt}Email`,
          type:"text",
          legend:"e-mail",
          val:(info?.contacts?.email ? info?.contacts.email : "")
        }
      ],
      [
        {
          form:`${txt}Tel`,
          type:"text",
          legend:"numer telefonu",
          val:(info?.contacts?.tel !== "Telefon" ? info?.contacts?.tel : ""),
          error: mode === "ZL" && errTel( info?.contacts?.tel !== "Telefon" ? info?.contacts?.tel : "" )
        }
      ],
      [
        {
          form:`${txt}Acc`,
          type:"text",
          legend:"numer konta",
          val:(info?.account ? info.account : "")
        }
      ],
      [
        {
          form:`${txt}NIP`,
          type:"text",
          legend:"NIP",
          val:(info?.nip !== "NIP" ? info.nip : ""),
          error: mode === "FS" && errNIP( info?.nip !== "NIP" ? info.nip : "" )
        }
      ]
    ]
  }

  let carInfo = (title, txt, info)=>{
    return [
      [title],
      [
        {
          form:`${txt}Brand`,
          type:"text",
          legend:"marka",
          style:"infoName",
          val:( info?.brand !== "Marka" ? info.brand : "" ),
          error: errBrand( info?.brand !== "Marka" ? info.brand : "" )
        },
        {
          form:`${txt}Model`,
          type:"text",
          legend:"model",
          val:( info?.model !== "Model" ? info.model : "" ),
          error: errModel( info?.model !== "Model" ? info.model : "" )
        },
        {
          form:`${txt}Numbers`,
          type:"text",
          legend:"nr. rej.",
          val:( info?.numbers !== "Nr. Rej." ? info.numbers : "" ),
          error: errNumbers( info?.numbers !== "Nr. Rej." ? info.numbers : "" )
        },
      ],
      [
        {
          form:`${txt}VIN`,
          type:"text",
          legend:"VIN",
          val:(info?.vin ? info.vin : "")
        }
      ],
      [
        {
          form:`${txt}Prod`,
          type:"text",
          legend:"rok prod.",
          val:( info?.prod ? info.prod : "" )
        },
        {
          form:`${txt}Odo`,
          type:"text",
          legend:"przebieg",
          val:( info?.odo ? info.odo : "" )
        },
        {
          form:`${txt}Engine`,
          type:"text",
          legend:"silnik",
          val:( info?.engine ? info.engine : "" )
        }
      ],
      [
        {
          form:`${txt}Fuel`,
          type:"text",
          legend:"stan paliwa",
          val:( info?.fuel ? info.fuel : "")
        }
      ],
      [
        {
          form:`${txt}Agree`,
          type:"text",
          legend:"zgoda na jazdę próbną",
          val:(info?.agree ? info.agree : "")
        }
      ]
    ]
  }

  let infos = mode === "FS"
  ? [ firmInfo("Sprzedawca", "Dealer", dealer), firmInfo("Nabywca", "Buyer", buyer) ]
  : [ carInfo("Opis pojazdu", "Car", car), firmInfo("Dane klienta", "Buyer", buyer) ]

  return(
    <section className="ElInfo flex stretch wrap">

    {
      infos.map( (el, i)=>{
        return(
          <div className="info flex column start" key={`Rect${el.title}_${i}`}>
            {
              el.map( (input, n)=>
                n === 0
                ? <div className="title flex start" key={`InfoInput${i}${n}`}>{input}</div>
                : !edit
                  ? <InfoLine props={{input, edit, AreaFn}} key={`InfoInput${i}${n}`} />
                  : <InfoLineEdit props={{input, edit, AreaFn}} key={`InfoInput${i}${n}`} />
              )
            }
          </div>
        )
      })
    }

    </section>
  )
}

const InfoLine = ({ props:{input, AreaFn} })=>{
  
  let legendMany = ``
  for(let i=0; i<input.length; i++){
    if(i !== input.length - 1){ legendMany = legendMany + input[i].legend + ` / ` }
    else{ legendMany = legendMany + input[i].legend }
  }
  
  return(
    <>
    {
      input.length > 1
      ? <InfoLineMany props={{input, legendMany}} />
      : <InfoLineOne props={{input}} />
    }
    </>
  )
}

const InfoLineMany = ({ props:{input, legendMany} })=>{
  return(
    <div className="infoLine">

      <span className="infoLineLegend flex start">
        {`${legendMany}:`}
      </span>

      <span className={`infoLineValue flex start bold ${input[0].style}`} >
        {
          input.map( (el, i)=>{

            let val = `${(el.val !== `` && i !== 0) ? `, ` : ``}${el.val}`

            return <span key={`infoLineValue${el.form}${i}`}>{val}</span>
            
          })
        }
      </span>

    </div>
  )
}

const InfoLineOne = ({ props:{input} })=>{
  return(
    <>
    {
      input.map( (el, i)=>{

        let key = `InfoLine${input.legend}${i}`
        
        return(
          <div className="infoLine" key={key}>

            <span className="infoLineLegend flex start">
              {`${el.legend}:`}
            </span>

            <span className={`infoLineValue flex start bold ${el.style}`}>
              {el.val}
            </span>

          </div>
        )        
      })
    }
    </>
  )
}

const InfoLineEdit = ({ props:{input, edit, AreaFn} })=>{
  return(
    <div className="infoLine flex">

      { input.map( (el, i)=> <Input props={{input:el, edit, AreaFn}} /> ) }

    </div>
  )
}