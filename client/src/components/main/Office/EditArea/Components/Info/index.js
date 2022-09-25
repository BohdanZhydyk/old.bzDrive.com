import React from "react";

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
  errNumbers,
  errVIN
} from "../../../../../../state/functions"
import './Info.scss'
import { InfoLine } from './InfoLine'
import { InfoLineEdit } from './InfoLineEdit'


const Info = ({ props:{i, el, print, AreaFn} })=>{

  let firmInfo = (title, txt, info)=>{
    return [
      [title],
      [
        {
          form:`${txt}_NAME`.toUpperCase(),
          type:"text",
          legend:"nazwa",
          style:"infoName",
          val:( (info?.name !== "Nabywca" && info?.name !== "Klient") ? info?.name : "" ),
          error:errName( (info?.name !== "Nabywca" && info?.name !== "Klient") ? info?.name : "" )
        }
      ],
      [
        {
          form:`${txt}_NIP`.toUpperCase(),
          type:"text",
          legend:"NIP",
          val:(info?.nip !== "NIP" ? nip_sanitize(info?.nip) : ""),
          img: (title !== "Sprzedawca" && !errNIP(info?.nip) ? "Search" : false),
          error:errNIP( info?.nip !== "NIP" ? nip_sanitize(info?.nip) : "" )
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
          img: (!errVIN(info.vin) ? "Search" : false),
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

  let info = (el.name === "Car")
    ? carInfo(el.title, el.name, el.arr)
    : firmInfo(el.title, el.name, el.arr)

  return(
    <div className="Info flex column start">
      {
        info.map( (input, n)=>
          n === 0
          ? <div className="title flex start bold" key={`InfoInput${i}${n}`}>{input}</div>
          : print
            ? <InfoLine props={{input}} key={`InfoInput${i}${n}`} />
            : <InfoLineEdit props={{input, print, AreaFn}} key={`InfoInput${i}${n}`} />
        )
      }
    </div>
  )
}

export default Info