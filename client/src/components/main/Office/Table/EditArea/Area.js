import { useState, useEffect, useRef } from "react"
import { useReactToPrint } from 'react-to-print';
import axios from 'axios'

import {
  bzPost,
  bzGetUser,
  bzCalc,
  unixToDateTimeConverter,
  inputDateToStandart,
  FirstToCapital
} from "./../../../../../state/functions"
import { EditAreaBtns } from "./Components/EditAreaBtns"
import { ElHead } from "./Components/ElHead"
import { ElInfo } from "./Components/ElInfo"
import { ElFaults } from "./Components/ElFaults"
import { ElArticles } from "./Components/ElArticles"
import { ElComment } from "./Components/ElComment"
import { ElAmount } from "./Components/ElAmount"
import { ElSignatures } from "./Components/ElSignatures"


export const Area = ({ props:{mode, officeFn, el, elFunc} })=>{

  let edit = el.edit

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const [width, setWidth] = useState(window.innerWidth)
  // window.onresize = ()=> setWidth(window.innerWidth)

  const [id, setID] = useState(el?._id ? el._id : false)

  const [status, setStatus] = useState(el?.status)
  
  const [place, setPlace] = useState(el?.place)
  
  const [date, setDate] = useState( el?.date ? el.date : unixToDateTimeConverter() )

  const [dateTo, setDateTo] = useState( el?.dateTo ? el.dateTo : unixToDateTimeConverter() )

  const [nr, setNr] = useState( el?.nr )

  const [dealer, setDealer] = useState(el?.dealer ? el.dealer : false)
  
  useEffect( ()=>{
    !dealer &&
    bzPost("/getOffice", { new:bzGetUser().login }, (data)=>{
      setDealer(data[0])
      !place && setPlace( data[0].addr.town )
      !nr?.year && setNr({
        letter: data[0].name[0].toUpperCase(),
        year: unixToDateTimeConverter().year,
        month: unixToDateTimeConverter().month,
        sign: nr?.sign ? nr?.sign : `------`
      })
    })
  },[])

  const [buyer, setBuyer] = useState( el?.buyer ? el.buyer : false)

  const [car, setCar] = useState( el?.car ? el.car : false)

  const [client, setClient] = useState( el?.client ? el.client : false)

  const [hint, setHint] = useState(false)
  
  let emptyArticle = {article:"", price:"0.00", quantity:"1", VAT:"23", netto:"0.00", vat:"0.00", sum:"0.00"}
  const [articles, setArticles] = useState(
    el?.articles
    ? el.articles
    : [{article:"", price:"0.00", quantity:"1", VAT:"23", netto:"0.00", vat:"0.00", sum:"0.00"}]
  )
  
  const [comments, setComments] = useState(el?.comments ? el.comments : '')

  const [pay, setPay] = useState(
    el.pay
    ? el.pay
    : { method:"gotówka", date: unixToDateTimeConverter() }
  )

  const [sign, setSign] = useState([
    {txt:"Osoba upoważniona do wystawienia"},
    {txt:"Osoba upoważniona do odbioru"}
  ])

  let AreaFn = (action)=>{
    switch(action.form){
      case "Place":          setPlace( action.value );                                                    break
      case "Date":           setDate( inputDateToStandart(action.value) );                                break
      case "DateTo":         setDateTo( inputDateToStandart(action.value) );                              break
      case "DoneStatus":     setStatus( action.value );                                                   break
      case "BuyerName":      setBuyer({ ...buyer, name:action.value });                                   break
      case "BuyerStreet":    setBuyer({ ...buyer, addr:{...buyer.addr, street:action.value} });           break
      case "BuyerZIP":       setBuyer({ ...buyer, addr:{...buyer.addr, zip:action.value} });              break
      case "BuyerTown":      setBuyer({ ...buyer, addr:{...buyer.addr, town:action.value} });             break
      case "BuyerTel":       setBuyer({ ...buyer, contacts:{...buyer.contacts, tel:action.value} });      break
      case "BuyerWww":       setBuyer({ ...buyer, contacts:{...buyer.contacts, www:action.value} });      break
      case "BuyerEmail":     setBuyer({ ...buyer, contacts:{...buyer.contacts, email:action.value} });    break
      case "BuyerAcc":       setBuyer({ ...buyer, account:action.value });                                break
      case "BuyerNIP":       setBuyer({ ...buyer, nip:action.value });                                    break
      case "ClientName":     setClient({ ...client, name:action.value });                                 break
      case "ClientStreet":   setClient({ ...client, addr:{...client.addr, street:action.value} });        break
      case "ClientZIP":      setClient({ ...client, addr:{...client.addr, zip:action.value} });           break
      case "ClientTown":     setClient({ ...client, addr:{...client.addr, town:action.value} });          break
      case "ClientTel":      setClient({ ...client, contacts:{...client.contacts, tel:action.value} });   break
      case "ClientWww":      setClient({ ...client, contacts:{...client.contacts, www:action.value} });   break
      case "ClientEmail":    setClient({ ...client, contacts:{...client.contacts, email:action.value} }); break
      case "ClientAcc":      setClient({ ...client, account:action.value });                              break
      case "ClientNIP":      setClient({ ...client, nip:action.value });                                  break
      case "CarBrand":       setCar({ ...car, brand:action.value });                                      break
      case "CarModel":       setCar({ ...car, model:action.value });                                      break
      case "CarNumbers":     setCar({ ...car, numbers:action.value.toUpperCase() });                                    break
      case "CarVIN":         setCar({ ...car, vin:action.value.toUpperCase() });                                        break
      case "CarProd":        setCar({ ...car, prod:action.value });                                       break
      case "CarOdo":         setCar({ ...car, odo:action.value });                                        break
      case "CarEngine":      setCar({ ...car, engine:action.value });                                     break
      case "CarFuel":        setCar({ ...car, fuel:action.value });                                       break
      case "CarAgree":       setCar({ ...car, agree:action.value });                                      break
      case "CarFaults":      setCar({ ...car, faults:action.value });                                     break
      case "ArtLinePlus":    setArticles([ ...articles, emptyArticle ]);                                  break
      case "ArtLineDelete":  setArticles(articles.filter( (art, n)=> (n !== action.i - 1) && art ));      break
      case "ArtChange":      ArtChange(action, articles, setArticles);                                    break
      case "Comments":       setComments(action.value);                                                   break
      case "Method":         setPay({ ...pay, method:action.value });                                     break
      case "PayDate":        setPay({ ...pay, date:inputDateToStandart(action.value) });                  break
      case "PrintDoc":       handlePrint();                                                               break
      case "GetCEIDG":
        let nip = action.value

        bzPost("/getOffice", { getClient:{"client.nip":nip} }, (data)=>{

          let Switch = (obj)=>{
            switch(action.for){
              case "BuyerNIP":    setBuyer({...buyer, ...obj});     break
              case "ClientNIP":   setClient({...client, ...obj});   break
              default: break
            }
          }

          if( data[0] ){ Switch(data[0].client); return }

          let NIP = ""
          for(let i=0; i<nip.length; i++){ if(nip[i] !== "-") NIP += nip[i] }

          let link = `https://wl-api.mf.gov.pl/api/search/nip/${NIP}?date=${date.year}-${date.month}-${date.day}`
          
          axios.get( link ).then( (res)=>{
            if(res.status === 200){
              
              res = res.data.result.subject
              let newAddr = res.residenceAddress ? res.residenceAddress.split(', ') : ""
              let zip = ""
              let town = ""

              if( newAddr !== "" ){
                for(let i=0; i<newAddr[1].length; i++){
                  if(i < 6) zip += newAddr[1][i]
                  if(i > 6) town += newAddr[1][i]
                }
              }

              Switch({
                name: res.name ? FirstToCapital( res.name ) : "",
                account: res.accountNumbers[0] ? res.accountNumbers[0] : "",
                addr:{
                  zip,
                  town:FirstToCapital(town),
                  street: newAddr[0] ? `ul. ${FirstToCapital(newAddr[0])}` : ""
                }
              })

            }
          })

        })
        break
      case "SaveDoc":
        
        let inv = `${nr.letter}/${nr.year}/${nr.month}/${nr.sign}`
        let net = "0.00"
        let vat = "0.00"
        let sum = "0.00"
        for(let i=0; i<articles?.length; i++){
          net = bzCalc( "+", net, articles[i].netto )
          vat = bzCalc( "+", vat, articles[i].vat )
          sum = bzCalc( "+", sum, articles[i].sum )
        }

        officeFn({
          type:`SAVE`,
          payload:{
            id, status:action.status, place, date, dateTo, nr, invoiceNr:inv, dealer,
            buyer, car, client, articles, comments, netto:net, priceVAT:vat, brutto:sum, pay
          }
        });
        break
      default: break
    }
  }

  let ArtChange = (action, articles, setArticles)=>{

    let calc = (art)=>{
      let price = art.price
      let quantity = art.quantity
      let VAT = art.VAT
      let netto = bzCalc( '*', price, quantity )
      let sum = bzCalc( '*', netto, bzCalc('+', '1.00', VAT/100) )
      let vat = bzCalc( '-', sum, netto )
      return {...art, price, quantity, VAT, netto, vat, sum}
    }
    let calcFromSUM = (art)=>{
      let sum = art.sum
      let VAT = art.VAT
      let quantity = art.quantity
      let netto = bzCalc( '/', sum, bzCalc('+', '1.00', VAT/100) )
      let vat = bzCalc( '-', sum, netto )
      let price = bzCalc( '/', netto, quantity )
      return {...art, price, quantity, VAT, netto, vat, sum}
    }

    setArticles(
      articles.map( (art, n)=>{
        if( n === (action.i - 1) ){
          if( action.cl === "ART el" ){ return {...art, article:action.value} }
          if( action.cl === "PRC el" ){ return calc({...art, price:action.value}) }
          if( action.cl === "QUA el" ){ return calc({...art, quantity:action.value}) }
          if( action.cl === "VAT el" ){ return calc({...art, VAT:action.value}) }
          if( action.cl === "PRV el" ){ return {...art, vat:action.value} }
          if( action.cl === "SUM el" ){ return calcFromSUM({...art, sum:action.value}) }
        }
        else{ return art }
      })
    )
  }

  return(
    <>
    {
      dealer &&
      <div className="EditArea flex column start" ref={componentRef}>

        <EditAreaBtns props={{mode, status, car, client, dealer, buyer, edit, id, elFunc, AreaFn}}/>

        {
          (mode === "FS" || mode === "ZL") &&
          <ElHead props={{mode, dealer, place, date, dateTo, status, edit, nr, AreaFn}} />
        }

        {
          (mode === "FS" || mode === "ZL" || mode === "KL") &&
          <ElInfo props={{mode, car, client, dealer, buyer, hint, edit, AreaFn}} />
        }

        {
          mode === "ZL" &&
          <ElFaults props={{car, edit, AreaFn}} />
        }

        {
          (mode === "FS" || mode === "ZL") &&
          <ElArticles props={{mode, articles, edit, AreaFn}} />
        }

        {
          mode === "FS" &&
          <ElComment props={{comments, edit, AreaFn}} />
        }
        
        {
          (mode === "FS") &&
          <ElAmount props={{mode, pay, articles, edit, AreaFn}} />
        }

        {
          (mode === "FS" || mode === "ZL") &&
          <ElSignatures props={{sign}} />
        }

        <EditAreaBtns props={{mode, status, car, client, dealer, buyer, edit, id, elFunc, AreaFn}}/>

      </div>
    }
    </>
  )
}