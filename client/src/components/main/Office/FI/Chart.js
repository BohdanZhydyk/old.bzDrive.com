import React from "react"
import { bzCalc, SumArray } from "../../../../state/functions"


export const Chart = ({ props:{month, m, FiLogic} })=>{

  const Date = month[0].date

  let FSsum = SumArray(month.filter(el=>el.mode === "FS").map(el=>el.sum)) // Faktury Sprzedazy (brutto)
  let FSnet = SumArray(month.filter(el=>el.mode === "FS").map(el=>el.net)) // Faktury Sprzedazy (netto)
  let FZsum = SumArray(month.filter(el=>el.mode === "FZ").map(el=>el.sum)) // Faktury Zakupu (brutto)
  let FZnet = SumArray(month.filter(el=>el.mode === "FZ").map(el=>el.net)) // Faktury Zakupu (netto)
  let PGsum = SumArray(month.filter(el=>el.mode === "PG").map(el=>el.sum)) // Paragony (brutto)
  let PGnet = SumArray(month.filter(el=>el.mode === "PG").map(el=>el.net)) // Paragony (netto)
  let ZLsum = SumArray(month.filter(el=>el.mode === "ZL").map(el=>el.sum)) // Zlecenia (brutto)
  let ZUsum = SumArray(month.filter(el=>el.mode === "ZU").map(el=>el.sum)) // ZUS
  let ZAsum = SumArray(month.filter(el=>el.mode === "ZA").map(el=>el.sum)) // Zakupy bez faktury

  let ZUS = bzCalc("+", ZUsum, "0.00")                          // ZUS (brutto)
  let PRsum = bzCalc("+", FSsum, PGsum)                         // Przychod (brutto)
  let PRnet = bzCalc( "-", bzCalc("+", FSnet, PGnet), ZUS )     // Przychod (netto)
  let WDsum = bzCalc("+", FZsum, "0.00")                        // Wydatki (brutto)
  let WDnet = bzCalc("+", FZnet, "0.00")                        // Wydatki (netto)
  let ZAnet = bzCalc("-", PRnet, WDnet)                         // Zaróbek (netto)
  let VAT = bzCalc( "*", ZAnet, "0.23" )                        // VAT do zaplaty
  let PRcz = bzCalc("-", ZLsum, PRsum)                          // Przychód na czarno (brutto)
  let WDcz = bzCalc("+", ZAsum, "0.00")                         // Wydatki na czarno (brutto)
  let ZAcz = bzCalc("-", PRcz, WDcz)                            // Zaróbek na czarno (brutto)

  const lines = [
    {txt:`Przychód (netto):`,             val:PRnet,  color:"#0f0"                        },
    {txt:`Wydatki (netto):`,              val:WDnet,  color:"#f00"                        },
    {txt:`Przychód na czarno (brutto):`,  val:PRcz,   color:"#0f0"                        },
    {txt:`Wydatki na czarno (brutto):`,   val:WDcz,   color:"#f00"                        },
    {txt:`VAT do zaplaty:`,               val:VAT,    color:"#00f"                        },
    {txt:`ZUS:`,                          val:ZUS,    color:"#fd0"                        },
    {txt:`Zaróbek (netto):`,              val:ZAnet,  color:(ZAnet > 0 ? "#0f0" : "#f00") },
    {txt:`Zaróbek na czarno (brutto):`,   val:ZAcz,   color:(ZAcz > 0 ? "#0f0" : "#f00")  }
  ]

  let maxSum = 2500

  let widthFn = (a)=> `${bzCalc("/", bzCalc("*", Math.abs(a), 100), maxSum)}%`

  return(
    <div className="Chart flex wrap">
      
      <div className="ChartLine flex" key={`ChartLineTop`}>
        <div className="Left Top flex start">{Date}</div>
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
        lines.map( (line, i)=>{

          let TxtStyle = {color:line.color}
          let ProgBarStyle = {width:widthFn(line.val), backgroundColor:`${line.color}9`}

          return(
            <div className="ChartLine flex" key={`ChartLine${i}`}>
              <div className="Left Line flex between" style={TxtStyle}>
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

    </div>
  )
}