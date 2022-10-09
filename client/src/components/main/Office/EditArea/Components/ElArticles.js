import React from 'react'

import { SumArray, bzCalcVatSum } from "../../../../../state/functions"


export const ElArticles = ({ props:{mode, articles, print, AreaFn} })=>{

  let CHANGE_INPUT = (cl, i, e)=> AreaFn({type:`CHG_ARTICLES`, cl, i, value:e.target.value})

  let Top = {
    nr: "Lp.",
    ART: "Nazwa towaru / usługi",
    PRI: "Cena, zł",
    QUA: "Ilość",
    VAT: "VAT, %",
    NET: "Kwota netto, zł",
    PRV: "Kwota VAT, zł",
    SUM: "Wartość brutto, zł"
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

            <span className="NUM flex">{line.nr}</span>
            <span className={`ART${print ? `print` : ``} flex start`}>{line.ART}</span>
            <span className="PRI flex">{line.PRI}</span>
            <span className="QUA flex">{line.QUA}</span>
            <span className="VAT flex">{line.VAT}</span>
            <span className="NET flex">{line.NET}</span>
            <span className="PRV flex">{line.PRV}</span>
            <span className="SUM flex">{line.SUM}</span>
            
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

            <span className="NUM nowrapTxt flex">{`${i + 1}.`}</span>
            {
              !print
              ? <Input props={{cl:"ART", val:line.ART, i, CHANGE_INPUT}} />
              : <span className={`ART${print ? `print` : ``} nowrapTxt flex start`}>{line.ART}</span>
            }
            {
              !print
              ? <Input props={{cl:"PRI", val:line.PRI, i, CHANGE_INPUT}} />
              : <span className="PRI nowrapTxt flex">{line.PRI}</span>
            }
            {
              !print
              ? <Input props={{cl:"QUA", val:line.QUA, i, CHANGE_INPUT}} />
              : <span className="QUA nowrapTxt flex">{line.QUA}</span>
            }
            {
              !print
              ? <Input props={{cl:"VAT", val:line.VAT, i, CHANGE_INPUT}} />
              : <span className="VAT nowrapTxt flex">{line.VAT}</span>
            }
            <span className="NET nowrapTxt flex">{bzCalcVatSum(line).NET}</span>
            <span className="PRV nowrapTxt flex">{bzCalcVatSum(line).PRV}</span>
            {
              !print
              ? <Input props={{cl:"SUM", val:bzCalcVatSum(line).SUM, i, CHANGE_INPUT}} />
              : <span className="SUM nowrapTxt flex">{bzCalcVatSum(line).SUM}</span>
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
      <span className="NET nowrapTxt flex">{ SumArray(newArticles.map( (el)=> bzCalcVatSum(el).NET )) }</span>
      <span className="PRV nowrapTxt flex">{ SumArray(newArticles.map( (el)=> bzCalcVatSum(el).PRV )) }</span>
      <span className="SUM nowrapTxt flex">{ SumArray(newArticles.map( (el)=> bzCalcVatSum(el).SUM )) }</span>

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