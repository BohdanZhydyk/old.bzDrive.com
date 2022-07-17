import React, { useState, useEffect } from "react"
import cookies from 'js-cookie'
import "./EditArea.scss"

import {
  emptyArt, YYYYMMDD, HEAD, BUYER, CAR, CLI,
  ART, FOO, EFFECT, GET_CEIDG, SAVE_DOC
} from "./actions"
import { bzGetUser } from "../../../../state/functions"
import { ElStatus } from "./Components/ElStatus"
import { EditAreaBtns } from "./Components/EditAreaBtns"
import { ElHead } from "./Components/ElHead"
import { ElInfo } from "./Components/ElInfo"
import { ElFaults } from "./Components/ElFaults"
import { ElArticles } from "./Components/ElArticles"
import { ElComment } from "./Components/ElComment"
import { ElAmount } from "./Components/ElAmount"
import { ElSignatures } from "./Components/ElSignatures"


const EditArea = ({ props:{mode, line, CANCEL, PRINTFUNC, ReloadFn, officeFn} })=>{

  const el = line
  const id = el?._id ? el._id : false

  const [status, setStatus] = useState( el?.status )
  const [place, setPlace] = useState( el?.place )
  const [date, setDate] = useState( el?.date ? el.date : YYYYMMDD )
  const [dateTo, setDateTo] = useState( el?.dateTo ? el.dateTo : YYYYMMDD )
  const [nr, setNr] = useState( el?.nr )
  const [dealer, setDealer] = useState( el?.dealer ? el.dealer : false )
  const [buyer, setBuyer] = useState( el?.buyer ? el.buyer : false)
  const [car, setCar] = useState( el?.car ? el.car : false)
  const [client, setClient] = useState( el?.client ? el.client : false)
  const [articles, setArticles] = useState( el?.articles ? el.articles : [emptyArt] )
  const [comments, setComments] = useState( el?.comments ? el.comments : '' )
  const [pay, setPay] = useState( el.pay ? el.pay : {method:"gotówka",  date:YYYYMMDD} )

  const sign = [
    {txt:"Osoba upoważniona do wystawienia"},
    {txt:"Osoba upoważniona do odbioru"}
  ]
  
  useEffect( ()=>{ !dealer && EFFECT(mode, setDealer, place, setPlace, nr, setNr) },[])

  let AreaFn = (action)=>{

    if( bzGetUser().login !== dealer.user && bzGetUser().role !== "admin" ){ setStatus("deleted") }

    switch(action.type){
      case "CHG_PLACE":       HEAD.CHG_PLACE(action, setPlace);                                 break
      case "CHG_FROM_DATE":   HEAD.CHG_FROM_DATE(action, pay, setPay, dateTo, setDate);         break
      case "CHG_TO_DATE":     HEAD.CHG_TO_DATE(action, date, setDateTo);                        break
      case "CHG_STATUS":      HEAD.CHG_STATUS(action, setStatus);                               break

      case "CHG_BUYER_NAME":  BUYER.CHG_BUYER_NAME(action, buyer, setBuyer);                    break
      case "CHG_BUYER_ZIP":   BUYER.CHG_BUYER_ZIP(action, buyer, setBuyer);                     break
      case "CHG_BUYER_TOWN":  BUYER.CHG_BUYER_TOWN(action, buyer, setBuyer);                    break
      case "CHG_BUYER_STR":   BUYER.CHG_BUYER_STR(action, buyer, setBuyer);                     break
      case "CHG_BUYER_WWW":   BUYER.CHG_BUYER_WWW(action, buyer, setBuyer);                     break
      case "CHG_BUYER_MAIL":  BUYER.CHG_BUYER_MAIL(action, buyer, setBuyer);                    break
      case "CHG_BUYER_TEL":   BUYER.CHG_BUYER_TEL(action, buyer, setBuyer);                     break
      case "CHG_BUYER_ACC":   BUYER.CHG_BUYER_ACC(action, buyer, setBuyer);                     break
      case "CHG_BUYER_NIP":   BUYER.CHG_BUYER_NIP(action, buyer, setBuyer);                     break

      case "CHG_CAR_BRAND":   CAR.CHG_CAR_BRAND(action, car, setCar);                           break
      case "CHG_CAR_MODEL":   CAR.CHG_CAR_MODEL(action, car, setCar);                           break
      case "CHG_CAR_NUM":     CAR.CHG_CAR_NUM(action, car, setCar);                             break
      case "CHG_CAR_VIN":     CAR.CHG_CAR_VIN(action, car, setCar);                             break
      case "CHG_CAR_PROD":    CAR.CHG_CAR_PROD(action, car, setCar);                            break
      case "CHG_CAR_ODO":     CAR.CHG_CAR_ODO(action, car, setCar);                             break
      case "CHG_CAR_ENG":     CAR.CHG_CAR_ENG(action, car, setCar);                             break
      case "CHG_CAR_FUEL":    CAR.CHG_CAR_FUEL(action, car, setCar);                            break
      case "CHG_CAR_AGREE":   CAR.CHG_CAR_AGREE(action, car, setCar);                           break
      case "CHG_CAR_FAULTS":  CAR.CHG_CAR_FAULTS(action, car, setCar);                          break
      
      case "CHG_CLIENT_NAME": CLI.CHG_CLIENT_NAME(action, client, setClient);                   break
      case "CHG_CLIENT_ZIP":  CLI.CHG_CLIENT_ZIP(action, client, setClient);                    break
      case "CHG_CLIENT_TOWN": CLI.CHG_CLIENT_TOWN(action, client, setClient);                   break
      case "CHG_CLIENT_STR":  CLI.CHG_CLIENT_STR(action, client, setClient);                    break
      case "CHG_CLIENT_WWW":  CLI.CHG_CLIENT_WWW(action, client, setClient);                    break
      case "CHG_CLIENT_MAIL": CLI.CHG_CLIENT_MAIL(action, client, setClient);                   break
      case "CHG_CLIENT_TEL":  CLI.CHG_CLIENT_TEL(action, client, setClient);                    break
      case "CHG_CLIENT_ACC":  CLI.CHG_CLIENT_ACC(action, client, setClient);                    break
      case "CHG_CLIENT_NIP":  CLI.CHG_CLIENT_NIP(action, client, setClient);                    break
      
      case "ART_LINE_PLUS":   ART.ART_LINE_PLUS(articles, setArticles);                         break
      case "ART_LINE_DELETE": ART.ART_LINE_DELETE(action, articles, setArticles);               break
      case "CHG_ARTICLES":    ART.CHG_ARTICLES(action, articles, setArticles);                  break
      
      case "CHG_COMMENTS":    FOO.CHG_COMMENTS(action, setComments);                            break
      case "CHG_METHOD":      FOO.CHG_METHOD(action, pay, setPay);                              break
      case "CHG_PAYDATE":     FOO.CHG_PAYDATE(action, date, pay, setPay);                       break

      case "KEYUP_IMG_BUYER_NIP": GET_CEIDG(action, date, buyer, setBuyer, client, setClient);  break

      case "PRINT_DOC":
        let el = {
          id, place, date, dateTo, nr, dealer, buyer,
          car, client, articles, comments, pay
        }
        cookies.set( 'Document', JSON.stringify({mode, el}) )
        window.open(`/document`, "_blank")
        break

      case "SAVE_DOC":
        SAVE_DOC({
          mode, id, action, place, date, dateTo, nr, dealer, buyer, car,
          client, articles, comments, pay, ReloadFn, officeFn
        })
        break
      
      default: break
    }
  }

  let print = PRINTFUNC ? PRINTFUNC.print : false
  let DO = ()=> PRINTFUNC.DO()

  return(
    <>
    {
      dealer &&
      <div className="EditArea flex column start">

        <ElStatus props={{mode, status, dealer, print, AreaFn}}/>

        <EditAreaBtns props={{mode, status, dealer, id, AreaFn, CANCEL, print, DO}}/>

        {
          (mode === "FS" || mode === "ZL") &&
          <ElHead props={{mode, dealer, place, date, dateTo, nr, print, AreaFn}} />
        }

        {
          (mode === "FS" || mode === "ZL" || mode === "KL") &&
          <ElInfo props={{mode, car, client, dealer, buyer, print, AreaFn}} />
        }

        {
          mode === "ZL" &&
          <ElFaults props={{car, print, AreaFn}} />
        }

        {
          (mode === "FS" || mode === "ZL") &&
          <ElArticles props={{mode, articles, print, AreaFn}} />
        }

        {
          mode === "FS" &&
          <ElComment props={{comments, print, AreaFn}} />
        }
        
        {
          (mode === "FS") &&
          <ElAmount props={{mode, pay, articles, print, AreaFn}} />
        }

        {
          (mode === "FS" || mode === "ZL") &&
          <ElSignatures props={{sign}} />
        }

        <EditAreaBtns props={{mode, status, dealer, id, AreaFn, CANCEL, print, DO}}/>

      </div>
    }
    </>
  )
}

export default EditArea