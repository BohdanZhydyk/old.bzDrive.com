import React from "react"

import { bzCalc, SumArray } from "../../../../state/functions"
import ActionBtn from "../../../All/ActionBtn"


export const Chart = ({ props:{month, m, show, setShow, FiLogic} })=>{

  const Date = month?.date

  let base = month?.base
  let col_9 = month?.col_9
  let col_10 = month?.col_10
  let col_14 = month?.col_14
  let ZU = month?.ZU

  let getSum = (mode, dig)=>{
    let ART = []
    base.filter(el=>el.nr.mode === mode).map( el=>
      el.articles.map( art=>
        ART.push( art[dig.toUpperCase()] )
      )
    )
    return SumArray(ART)
  }

  let FSsum = // Faktury Sprzedazy (brutto)
    base ? getSum("FS", "sum") : (col_9 ? col_9.sum  : "0.00")
  let FSnet = // Faktury Sprzedazy (netto)
    base ? getSum("FS", "net") : (col_9 ? col_9.net  : "0.00")

  let FZsum = // Faktury Zakupu (brutto)
    base ? getSum("FZ", "sum") : (col_10 && col_14 ? bzCalc("+", col_10.sum, col_14.sum)  : "0.00")
  let FZnet = // Faktury Zakupu (netto)
    base ? getSum("FZ", "net") : (col_10 && col_14 ? bzCalc("+", col_10.net, col_14.net)  : "0.00")

  let PSsum = month?.base ? getSum("PS", "sum") : "0.00"                  // Paragon Sprzedazy (brutto)
  let PSnet = month?.base ? getSum("PS", "net") : "0.00"                  // Paragon Sprzedazy (netto)
  let PZsum = month?.base ? getSum("PZ", "sum") : "0.00"                  // Paragon Zakupu (brutto)
  let PZnet = month?.base ? getSum("PZ", "net") : "0.00"                  // Paragon Zakupu (netto)
  let ZLsum = month?.base ? getSum("ZL", "sum") : "0.00"                  // Zlecenia (brutto)
  let ZUsum = month?.base ? getSum("ZU", "sum") : (ZU ? ZU.sum : "0.00")  // ZUS

  let ZUS = bzCalc("+", ZUsum, "0.00")                              // ZUS (brutto)

  let PRsum = bzCalc("+", FSsum, PSsum)                             // Przychod (brutto)
  let PRnet = bzCalc("+", FSnet, PSnet)                             // Przychod (netto)
  let WDsum = bzCalc("+", FZsum, "0.00")                            // Wydatki (brutto)
  let WDnet = bzCalc("+", FZnet, "0.00")                            // Wydatki (netto)

  let ROZnet = bzCalc( "-", bzCalc("-", PRnet, WDnet), ZUS )        // Roznica (netto)                               

  let PIT_5 = (ROZnet > 0) ? bzCalc("*", ROZnet, "0.19") : "0.00"   // PIT-5 podatek dochodowy
  let ZAnet = bzCalc("-", ROZnet, PIT_5)                            // Zaróbek (netto)
  let VAT_7 = bzCalc( "*", bzCalc("-", PRnet, WDnet), "0.23" )      // VAT do zaplaty

  let PRcz = month?.base ? bzCalc("-", ZLsum, PRsum) : "0.00"       // Przychód na czarno (brutto)
  let WDcz = month?.base ? bzCalc("+", PZsum, "0.00") : "0.00"      // Wydatki na czarno (brutto)
  let ZAcz = month?.base ? bzCalc("-", PRcz, WDcz) : "0.00"         // Zaróbek na czarno (brutto)

  const lines = [
    {txt:`ZUS`,                          val:ZUS,    cl:false,   color:"#fd0"                        },
    {txt:`VAT-7 (deklaracja podatkowa)`, val:VAT_7,  cl:false,   color:"#fd0"                        },
    {txt:`PIT-5 (podatek dochodowy)`,    val:PIT_5,  cl:false,   color:"#fd0"                        },
    {txt:`Przychód (netto)`,             val:PRnet,  cl:false,   color:"#0f0"                        },
    {txt:`Wydatki (netto)`,              val:WDnet,  cl:false,   color:"#f00"                        },
    {txt:`Zaróbek (netto)`,              val:ZAnet,  cl:true,    color:(ZAnet > 0 ? "#0f0" : "#f00") }
  ]
  const blackLines = !show ? [] : [
    {txt:`Przychód na czarno (brutto)`,  val:PRcz,   cl:false,   color:"#0f0"                        },
    {txt:`Wydatki na czarno (brutto)`,   val:WDcz,   cl:false,   color:"#f00"                        },
    {txt:`Zaróbek na czarno (brutto)`,   val:ZAcz,   cl:true,    color:(ZAcz > 0 ? "#0f0" : "#f00")  }
  ]

  let max = [ZUS, VAT_7, PIT_5, PRnet, WDnet, ZAnet, PRcz, WDcz, ZAcz].sort( (a, b)=> parseInt(b) - parseInt(a) )[0]
  let maxSum = parseInt( (parseInt(max) + 1000) / 1000 ) * 1000

  let widthFn = (a)=> `${bzCalc("/", bzCalc("*", Math.abs(a), 100), maxSum)}%`

  return(
    <div className="Chart flex wrap">
      
      <div className="ChartLine flex" style={{borderBottom:"1px dashed #999"}} key={`ChartLineTop`}>
        <div className="Left Top txtOrg bold flex between">
          <span>{Date}</span>
          <span>{`zł`}</span>
        </div>
        <div className="Right Top flex">
        {
          [1,2,3,4].map( (mark, n)=>{
            return(
              <span className={`mark mark${n === 0 ? `L` : `R`} flex end`} key={`Mark${m}${n}`}>
                {maxSum / 4 * mark}
              </span>
            )
          })
        }
        </div>
      </div>

      {
        [...lines, ...blackLines].map( (line, i)=>{

          let Border = (i === 2 || i === 5 || i === 8) ? {borderBottom:"1px dashed #999"} : {}
          let TxtStyle = {
            color:line.color,
            fontSize:`${line.cl ? `120%` : `100%`}`,
            fontWeight:`${line.cl ? `bold` : `none`}`,
          }
          let ProgBarStyle = {width:widthFn(line.val), backgroundColor:`${line.color}9`}

          return(
            <div className="ChartLine flex" style={Border} key={`ChartLine${i}`}>
              <div className={`Left Line flex between`} style={TxtStyle}>
                <span>{line.txt}</span>
                <span>{line.val}</span>
              </div>
              <div className="Right Line flex start">
                <span className="ProgBar flex" style={ProgBarStyle}></span>
              </div>
            </div>
          )
        })
      }

      <div className="ChartBottom flex">

        <div className="ChartInfo bold flex start">
        { `Rozliczenia na podstawie ${ month?.base ? `wystawionych faktur i zlecen` : `Bazy Danych` }`  }
        </div>

        <div className="ChartBtns flex end">
          <ActionBtn props={{ name: show ? "Cancel" : "Edit", click:()=> setShow(!show) }} />
        </div>

      </div>

    </div>
  )
}