import React from 'react'
import {
  vin_sanitise,
  numbers_sanitise,
  zip_sanitize,
  tel_sanitize,
  acc_sanitize,
  nip_sanitize,
  errName,
  errZIP,
  errTown,
  errStreet,
  errNIP,
  errBrand,
  errModel,
  errTel,
  errNumbers
} from "../../../../../state/functions"
import { Input } from "./../../../../All/Input"


export const ElInfo = ({ props:{mode, car, client, dealer, buyer, print, AreaFn} })=>{

  let firmInfo = (title, txt, info)=>{
    return [
      [title],
      [
        {
          form:`${txt}_NAME`.toUpperCase(),
          type:"text",
          legend:"nazwa",
          style:"infoName",
          val:( (info?.name !== "Nabywca" && info?.name !== "Klient") ? info.name : "" ),
          error:errName( (info?.name !== "Nabywca" && info?.name !== "Klient") ? info.name : "" )
        }
      ],
      [
        {
          form:`${txt}_ZIP`.toUpperCase(),
          type:"text",
          legend:"kod pocztowy",
          val:(info?.addr?.zip ? zip_sanitize(info.addr.zip) : ""),
          error:errZIP( zip_sanitize(info?.addr?.zip) )
        },
        {
          form:`${txt}_TOWN`.toUpperCase(),
          type:"text",
          legend:"miejscowość",
          val:(info?.addr?.town ? info.addr.town : ""),
          error:errTown( info?.addr?.town )
        },
        {
          form:`${txt}_STR`.toUpperCase(),
          type:"text",
          legend:"ulica",
          val:(info?.addr?.street ? info.addr.street : ""),
          error:errStreet( info?.addr?.street )
        }
      ],
      [
        {
          form:`${txt}_NIP`.toUpperCase(),
          type:"text",
          legend:"NIP",
          val:(info?.nip !== "NIP" ? nip_sanitize(info.nip) : ""),
          error:errNIP( info?.nip !== "NIP" ? nip_sanitize(info.nip) : "" )
        }
      ],
      [
        {
          form:`${txt}_TEL`.toUpperCase(),
          type:"text",
          legend:"numer telefonu",
          val:(info?.contacts?.tel !== "Telefon" ? tel_sanitize(info?.contacts?.tel) : ""),
          error:errTel( info?.contacts?.tel !== "Telefon" ? tel_sanitize(info?.contacts?.tel) : "" )
        },
        {
          form:`${txt}_WWW`.toUpperCase(),
          type:"text",
          legend:"strona internetowa",
          val:(info?.contacts?.www ? info.contacts.www : "")
        },
        {
          form:`${txt}_MAIL`.toUpperCase(),
          type:"text",
          legend:"e-mail",
          val:(info?.contacts?.email ? info?.contacts.email : "")
        }
      ],
      [
        {
          form:`${txt}_ACC`.toUpperCase(),
          type:"text",
          legend:"numer konta",
          val:(info?.account ? acc_sanitize(info.account) : "")
        }
      ]
    ]
  }

  let carInfo = (title, txt, info)=>{
    return [
      [title],
      [
        {
          form:`${txt}_BRAND`.toUpperCase(),
          type:"text",
          legend:"marka",
          style:"infoName",
          val:( info?.brand !== "Marka" ? info.brand : "" ),
          error: errBrand( info?.brand !== "Marka" ? info.brand : "" )
        },
        {
          form:`${txt}_MODEL`.toUpperCase(),
          type:"text",
          legend:"model",
          val:( info?.model !== "Model" ? info.model : "" ),
          error: errModel( info?.model !== "Model" ? info.model : "" )
        },
        {
          form:`${txt}_NUM`.toUpperCase(),
          type:"text",
          legend:"nr. rej.",
          val:( info?.numbers ? numbers_sanitise(info.numbers) : "" ),
          error: errNumbers( info?.numbers !== "Nr. Rej." ? numbers_sanitise(info.numbers) : "" )
        },
      ],
      [
        {
          form:`${txt}_VIN`.toUpperCase(),
          type:"text",
          legend:"VIN",
          val:(info?.vin ? vin_sanitise(info.vin) : "")
        }
      ],
      [
        {
          form:`${txt}_PROD`.toUpperCase(),
          type:"text",
          legend:"rok prod.",
          val:( info?.prod ? info.prod : "" )
        },
        {
          form:`${txt}_ODO`.toUpperCase(),
          type:"text",
          legend:"przebieg",
          val:( info?.odo ? info.odo : "" )
        },
        {
          form:`${txt}_ENG`.toUpperCase(),
          type:"text",
          legend:"silnik",
          val:( info?.engine ? info.engine : "" )
        }
      ],
      [
        {
          form:`${txt}_FUEL`.toUpperCase(),
          type:"text",
          legend:"stan paliwa",
          val:( info?.fuel ? info.fuel : "")
        }
      ],
      [
        {
          form:`${txt}_AGREE`.toUpperCase(),
          type:"text",
          legend:"zgoda na jazdę próbną",
          val:(info?.agree ? info.agree : "")
        }
      ]
    ]
  }

  let infos = []
  if(mode === "FS"){
    infos = [ firmInfo("Sprzedawca", "Dealer", dealer), firmInfo("Nabywca", "Buyer", buyer) ]
  }
  if(mode === "ZL"){
    infos = [ carInfo("Opis pojazdu", "Car", car), firmInfo("Dane klienta", "Buyer", buyer) ]
  }
  if(mode === "KL"){
    infos = [ firmInfo("Dane klienta", "Client", client) ]
  }

  return(
    <section className="ElInfo flex stretch between wrap">

    {
      infos.map( (el, i)=>{
        return(
          <div className="info flex column start" key={`Rect${el.title}_${i}`}>
            {
              el.map( (input, n)=>
                n === 0
                ? <div className="title flex start bold" key={`InfoInput${i}${n}`}>{input}</div>
                : print
                  ? <InfoLine props={{input}} key={`InfoInput${i}${n}`} />
                  : <InfoLineEdit props={{input, print, AreaFn}} key={`InfoInput${i}${n}`} />
              )
            }
          </div>
        )
      })
    }

    </section>
  )
}

const InfoLine = ({ props:{input} })=>{
  
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

            let val = `${(el.val !== `` && i !== 0) ? `, ` : ``}${el.val ? el.val : ""}`

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
        return(
          <div className="infoLine" key={`InfoLine${input.legend}${i}`}>

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

const InfoLineEdit = ({ props:{input, print, AreaFn} })=>{
  return(
    <div className="infoLine flex">

      {
        input.map( (el, i)=>{
          return <Input props={{input:el, print, Fn:AreaFn}} key={`InfoLine${input.legend}${i}`} />
        })
      }

    </div>
  )
}