import React from 'react'
import './BlankInvoice.scss'


const BlankInvoice = ({})=>{
  return(
    <div className="blankInvoice flex column">
      
      <div className="sectionOne flex">

        <div className="logo flex start bold">
          <img src="https://files.bzdrive.com/img/Drive/logo/logoDrive.gif" alt="bzDrive" />
          <span className="txtOrg">
            <span>bz</span>
            <span className="txtBlk">Drive</span>
            <span>.com</span>
          </span>
        </div>

        <div className="date flex wrap">
          <div className="left flex end">Miejsce wystawienia:</div>
          <div className="right flex start bold">Wejherowo</div>
          <div className="left flex end">Data wystawienia:</div>
          <div className="right flex start bold">2021/06/10</div>
        </div>

      </div>

      <div className="sectionTwo flex bold">
        <span className="inv flex">Faktura Nr</span>
        <span className="nr flex">000001/06/2021</span>
      </div>

      <div className="sectionThree flex">
        <div className="rectangle">
          <div className="bold">Sprzedawca</div>
          <div className="line flex start"></div>
          <div className="line flex start">bzDrive</div>
          <div className="line flex start">ul. Kwiatowa 8/4</div>
          <div className="line flex start">84-239 Bolszewo</div>
          <div className="line flex start">tel. 667-927-157</div>
          <div className="line flex start">www: bzdrive.com</div>
          <div className="line flex start">e-mail: mail@bzdrive.com</div>
          <div className="line flex start"></div>
          <div className="nip bold">NIP 000-000-00-00</div>
        </div>
        <div className="rectangle">
          <div className="bold">Nabywca</div>
          <div className="line flex start"></div>
          <div className="line flex start"></div>
          <div className="line flex start"></div>
          <div className="line flex start"></div>
          <div className="line flex start"></div>
          <div className="line flex start"></div>
          <div className="line flex start"></div>
          <div className="line flex start"></div>
          <div className="nip bold">NIP 000-000-00-00</div>
        </div>
      </div>

      <div className="sectionFour flex">
        table here...
      </div>

    </div>
  )
}

export default BlankInvoice