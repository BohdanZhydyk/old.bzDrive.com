import React from 'react'


let buyer = {
  id: "",
  name: ["nazwa firmy"],
  img: "",
  addr: ["addr1", "adr2"],
  tel: "tel",
  www: "www",
  mail: "e-mail",
  account: "Nr. konta",
  nip: "000-000-00-00"
}

export const Info = ({info, name}) => {

  return(
    <div className="rectangle" key={`Rect${name}`}>

      <div className="bold">{name}</div>

      <div className="line flex start"></div>

      <div className="line flex start">{`${info ? info.name : `nazwa firmy`}`}</div>

      <div className="line flex start">{`${info ? info.addr[0] : `ulica, kod pocztowy`}`}</div>

      <div className="line flex start">{`${info ? info.addr[1] : `miejscowość`}`}</div>

      <div className="line flex start">{`${info ? `tel.: ${info.contacts.tel}` : `numer telefonu`}`}</div>

      <div className="line flex start">{`${info ? `www: ${info.contacts.www}` : `strona internetowa`}`}</div>

      <div className="line flex start">{`${info ? `e-mail: ${info.contacts.email}` : `e-mail`}`}</div>

      <div className="line flex start">{`${info ? `Nr konta: ${info.account}` : `numer konta`}`}</div>

      <div className="line flex start"></div>

      <div className="nip bold">{`${info ? `NIP: ${info.nip}` : `NIP: 000-000-00-00`}`}</div>

    </div>
  )
}