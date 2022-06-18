import React from "react"

import { SummaryAll } from "../../../../../../state/functions"


export const ElArticles = ({ props:{mode, articles, edit, AreaFn} })=>{

  let CHANGE_INPUT = (cl, i, e)=> AreaFn({form:`ArtChange`, cl, i, value:e.target.value})

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
      netto: SummaryAll(newArticles).net,
      vat: SummaryAll(newArticles).vat,
      sum: SummaryAll(newArticles).sum
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

            <Element props={{el:el.NUR, i, edit, CHANGE_INPUT}} />
            <Element props={{el:el.ART, i, edit, CHANGE_INPUT}} />
            <Element props={{el:el.PRC, i, edit, CHANGE_INPUT}} />
            <Element props={{el:el.QUA, i, edit, CHANGE_INPUT}} />
            <Element props={{el:el.VAT, i, edit, CHANGE_INPUT}} />
            <Element props={{el:el.NET, i, edit, CHANGE_INPUT}} />
            <Element props={{el:el.PRV, i, edit, CHANGE_INPUT}} />
            <Element props={{el:el.SUM, i, edit, CHANGE_INPUT}} />

            { edit && <Btn props={{i, cl:el.VAT.cl, mode, newArticles, AreaFn}} /> }

          </div>
        )
      })
    }
    
    </section>
  )
}

const Element = ({ props:{el, i, edit, CHANGE_INPUT} })=>{

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
        !edit
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
  let src = `https://files.bzdrive.com/img/ico/ico${top ? `Plus` : `Delete`}.png`
  let form = top ? (len ? "ArtLinePlus" : "") : "ArtLineDelete"
  let none = (cl === `VAT elEmpty`) ? `none` : `flex`

  let BTN_CLICK = ()=> AreaFn({form, i})

  return(
    <div className="lineBtn flex">
      <img className={`imgBtn ${none}`} src={src} onClick={ ()=> BTN_CLICK() } alt={form} />
    </div>
  )
}