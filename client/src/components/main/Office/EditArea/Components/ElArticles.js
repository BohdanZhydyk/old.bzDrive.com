import React from 'react'
import { SumArray } from "../../../../../state/functions"


export const ElArticles = ({ props:{mode, articles, print, AreaFn} })=>{

  let CHANGE_INPUT = (cl, i, e)=> AreaFn({type:`CHG_ARTICLES`, cl, i, value:e.target.value})

  let top = {
    nr: {cl:"elTop", val: "Lp."},
    article: {cl:"elTop", val: "Nazwa towaru / usługi"},
    price: {cl:"elTop", val: "Cena, zł"},
    quantity: {cl:"elTop", val: "Ilość"},
    VAT: {cl:"elTop", val: "VAT, %"},
    netto: {cl:"elTop", val: "Kwota netto, zł"},
    vat: {cl:"elTop", val: "Kwota VAT, zł"},
    sum: {cl:"elTop", val: "Wartość brutto, zł"}
  }
  
  let newArticles = articles.filter( (art)=> art !== {} && art)

  let empty = {
    nr: {cl:"elEmpty", val: "none"},
    article: {cl:"elEmpty", val: "none"},
    price: {cl:"elEmpty", val: "none"},
    quantity: {cl:"elEmpty", val: "none"},
    VAT: {cl:"elEmpty", val: "none"},
    netto: {cl:"elEmpty", val: "none"},
    vat: {cl:"elEmpty", val: "none"},
    sum: {cl:"elEmpty", val: "none"}
  }

  let bottom = {
      nr: {cl:"elNone", val: "none"},
      article: {cl:"elNone", val: "none"},
      price: {cl:"elNone", val: "none"},
      quantity: {cl:"elNone", val: "none"},
      VAT: {cl:"elTop", val: "Razem"},
      netto: SumArray(newArticles.map( (el)=> el.netto)),
      vat: SumArray(newArticles.map( (el)=> el.vat)),
      sum: SumArray(newArticles.map( (el)=> el.sum))
  }

  return(
    <section className="ElArticles flex wrap">

    {
      [ top, ...newArticles, empty, bottom ].map( (line, i)=>{

        let classes = (txt)=> txt?.cl ? txt.cl : `el`
        let valNUR = line.nr?.val ? line.nr.val : `${i}.`
        let VAL = (txt)=> txt?.val ? txt.val : txt

        let el = {
          NUR:{ i, cl:`NUR ${classes(line.nr)}`, val:valNUR },
          ART:{ i, cl:`ART ${classes(line.article)}`, val:VAL(line.article) },
          PRC:{ i, cl:`PRC ${classes(line.price)}`, val:VAL(line.price) },
          QUA:{ i, cl:`QUA ${classes(line.quantity)}`, val:VAL(line.quantity) },
          VAT:{ i, cl:`VAT ${classes(line.VAT)}`, val:VAL(line.VAT) },
          NET:{ i, cl:`NET ${classes(line.netto)}`, val:VAL(line.netto) },
          PRV:{ i, cl:`PRV ${classes(line.vat)}`, val:VAL(line.vat) },
          SUM:{ i, cl:`SUM ${classes(line.sum)}`, val:VAL(line.sum) }
        }

        return(
          <div className="line flex wrap stretch" key={`tableLine${i}`}>

            <Element props={{el:el.NUR, i, print, CHANGE_INPUT}} />
            <Element props={{el:el.ART, i, print, CHANGE_INPUT}} />
            <Element props={{el:el.PRC, i, print, CHANGE_INPUT}} />
            <Element props={{el:el.QUA, i, print, CHANGE_INPUT}} />
            <Element props={{el:el.VAT, i, print, CHANGE_INPUT}} />
            <Element props={{el:el.NET, i, print, CHANGE_INPUT}} />
            <Element props={{el:el.PRV, i, print, CHANGE_INPUT}} />
            <Element props={{el:el.SUM, i, print, CHANGE_INPUT}} />

            { !print && <Btn props={{i, cl:el.VAT.cl, mode, newArticles, AreaFn}} /> }

          </div>
        )
      })
    }
    
    </section>
  )
}

const Element = ({ props:{el, i, print, CHANGE_INPUT} })=>{

  let classes = `${el.cl} flex`

  return(
    <div className={classes}>
    {
      (i === 0 || el.cl === `NUR el` || el.cl === `NET el`|| el.cl === `PRV el`)
      ?
      <span>{ el.val ? el.val : "" }</span>
      :
      <>
      {
        print
        ?
        <div className={`${el.cl === `ART el` && `textStart`}`}>{ el.val ? el.val : "" }</div>
        :
        (el.val === `none` || el.val === `Razem`)
          ?
          <div>{el.val === `Razem` ? `Razem` : ``}</div>
          :
          <input
            className={`${el.cl === `ART el` && `textStart`}`}
            type="text"
            placeholder={ el.val ? el.val : "wprowadź dane..." }
            value={ el.val ? el.val : "" }
            onChange={ (e)=> CHANGE_INPUT(el.cl, i, e) }
          />
          
      }
      </>
    }
    </div>
  )
}

const Btn = ({ props:{i, cl, mode, newArticles, AreaFn} })=>{

  let len =  mode === "ZL" ? newArticles.length < 14 : newArticles.length < 17
  let top = (cl === "VAT elTop")
  let src = `https://bzdrive.com/files/ico/ico${top ? `Plus` : `Delete`}.png`
  let type = top ? (len ? "ART_LINE_PLUS" : "") : "ART_LINE_DELETE"
  let none = (cl === `VAT elEmpty`) ? `none` : `flex`

  let BTN_CLICK = ()=> AreaFn({type, i})

  return(
    <div className="lineBtn flex">
      <img className={`imgBtn ${none}`} src={src} onClick={ ()=> BTN_CLICK() } alt={type} />
    </div>
  )
}