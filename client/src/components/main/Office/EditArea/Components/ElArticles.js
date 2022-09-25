import React from 'react'
import { SumArray } from "../../../../../state/functions"


export const ElArticles = ({ props:{mode, articles, print, AreaFn} })=>{

  let CHANGE_INPUT = (cl, i, e)=> AreaFn({type:`CHG_ARTICLES`, cl, i, value:e.target.value})

  let Top = {
    nr: "Lp.",
    article: "Nazwa towaru / usługi",
    price: "Cena, zł",
    quantity: "Ilość",
    VAT: "VAT, %",
    netto: "Kwota netto, zł",
    vat: "Kwota VAT, zł",
    sum: "Wartość brutto, zł"
  }
  
  let newArticles = articles.filter( (art)=> art !== {} && art)

  let plusIco = "https://bzdrive.com/files/ico/icoPlus.png"
  let deleteIco = "https://bzdrive.com/files/ico/icoDelete.png"

  return(
    <section className="ElArticles flex wrap">

    {
      [ Top ].map( (line, i)=>{

        return(
          <div className="line lineTop flex wrap stretch" key={`tableLine${line.nr}${i}`}>

            <span className="NUR flex">{line.nr}</span>
            <span className={`ART${print ? `print` : ``} flex start`}>{line.article}</span>
            <span className="PRC flex">{line.price}</span>
            <span className="QUA flex">{line.quantity}</span>
            <span className="VAT flex">{line.VAT}</span>
            <span className="NET flex">{line.netto}</span>
            <span className="PRV flex">{line.vat}</span>
            <span className="SUM flex">{line.sum}</span>
            
            {
              !print &&
              <Btn props={{ico:plusIco, title:`dodać`, alt:"plus", i, mode, newArticles, AreaFn}} />
            }

          </div>
        )
      })
    }

    {
      newArticles.map( (line, i)=>{

        return(
          <div className="line flex wrap stretch" key={`tableLine${line.nr}${i}`}>

            <span className="NUR nowrapTxt flex">{`${i + 1}.`}</span>
            {
              !print
              ? <Input props={{cl:"ART", val:line.article, i, CHANGE_INPUT}} />
              : <span className={`ART${print ? `print` : ``} nowrapTxt flex start`}>{line.article}</span>
            }
            {
              !print
              ? <Input props={{cl:"PRC", val:line.price, i, CHANGE_INPUT}} />
              : <span className="PRC nowrapTxt flex">{line.price}</span>
            }
            {
              !print
              ? <Input props={{cl:"QUA", val:line.quantity, i, CHANGE_INPUT}} />
              : <span className="QUA nowrapTxt flex">{line.quantity}</span>
            }
            {
              !print
              ? <Input props={{cl:"VAT", val:line.VAT, i, CHANGE_INPUT}} />
              : <span className="VAT nowrapTxt flex">{line.VAT}</span>
            }
            <span className="NET nowrapTxt flex">{line.netto}</span>
            <span className="PRV nowrapTxt flex">{line.vat}</span>
            {
              !print
              ? <Input props={{cl:"SUM", val:line.sum, i, CHANGE_INPUT}} />
              : <span className="SUM nowrapTxt flex">{line.sum}</span>
            }
            
            {
              !print &&
              <Btn props={{ico:deleteIco, title:`usunąć`, alt:"delete", i, mode, newArticles, AreaFn}} />
            }

          </div>
        )
      })
    }

    <div className="line flex wrap stretch bold" style={{marginTop:"2vw"}}>
      <span className={`EMPTY${print ? `print` : ``} nowrapTxt flex`}></span>
      <span className="TOT nowrapTxt flex end">{ `Razem:` }</span>
      <span className="NET nowrapTxt flex">{ SumArray(newArticles.map( (el)=> el.netto)) }</span>
      <span className="PRV nowrapTxt flex">{ SumArray(newArticles.map( (el)=> el.vat)) }</span>
      <span className="SUM nowrapTxt flex">{ SumArray(newArticles.map( (el)=> el.sum)) }</span>

      {
        !print &&
        <Btn props={{ico:plusIco, title:`dodać`, alt:"plus", i:0, mode, newArticles, AreaFn}} />
      }
    </div>
    
    </section>
  )
}

const Input = ({ props:{cl, val, i, CHANGE_INPUT} })=>{
  return(
    <span className={`${cl} nowrapTxt flex`}>
      <input
        style={{textAlign:(cl === "ART" ? "left" : "center")}}
        type="text"
        placeholder={ val ? val : "wprowadź dane..." }
        value={ val ? val : "" }
        onChange={ (e)=> CHANGE_INPUT(cl, i, e) }
      />
    </span>
  )
}

const Btn = ({ props:{ico, title, alt, i, mode, newArticles, AreaFn} })=>{

  let len =  mode === "ZL" ? newArticles.length < 14 : newArticles.length < 17
  let type = alt === "plus" ? (len ? "ART_LINE_PLUS" : "") : "ART_LINE_DELETE"

  let BTN_CLICK = ()=> AreaFn({type, i})

  return(
    <div className="flex">
      <img className="imgBtn" src={ico} title={title} alt={alt} onClick={ ()=> BTN_CLICK() } />
    </div>
  )
}