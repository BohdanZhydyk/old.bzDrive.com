
import { bzGetUser, NormalizeNr, SumArray } from "../../../../state/functions"
import { officeFn } from "./../actions"


export const Fn = (action, fi, setFi)=>{

  switch(action.type){}

  switch(action.type){
    case "GET_FINANCES":  GET_FINANCES(action, fi, setFi);    break
    case "BTN_CLICK":     BTN_CLICK(action, fi, setFi);       break
    default: break
  }

}

const GET_FINANCES = (action, fi, setFi)=>{

  let top = {
    mode: "Top",
    date: parseInt( action.dates.$gte / 100 ),
    nr: "Nr",
    doc: "Dokument",
    info: "Informacja",
    sum: "Summa",
    btns: ["Plus"]
  }

  officeFn(
    {
      type:"GET_TABLE",
      mode:"FS",
      query: {"nr.from":action.dates, user:bzGetUser().login}
    },
    (data)=>{

      let FSdata = data.map( el=>{

        let FSsum = SumArray(el.articles.map(art=>art.SUM))
        let FSnet = SumArray(el.articles.map(art=>art.NET))

        return {mode:el.nr.mode, doc:NormalizeNr(el.nr), info:el.buyer.name, net:FSnet, sum:FSsum}

      })

      officeFn(
        {
          type:"GET_TABLE",
          mode:"ZL",
          query: {"nr.to":action.dates}
        },
        (data)=>{
  
          let ZLdata = data.filter(el=>el.status !== "edited").map( el=>{

            let ZLsum = SumArray(el.articles.map(art=>art.SUM))
            let ZLnet = SumArray(el.articles.map(art=>art.NET))
            let info = `${el?.car?.brand ? el.car.brand : ``
              }${(el?.car?.brand && el?.car?.model) ? ` - ` : ``
              }${el?.car?.model ? el.car.model : ``
              }${(el?.buyer?.name || el?.buyer?.contacts?.tel) ? ` [ ` : ``
              }${el?.buyer?.name ? el.buyer.name : ``
              }${(el?.buyer?.name && el?.buyer?.contacts?.tel) ? `,` : ``
              }${el?.buyer?.contacts?.tel ? ` tel: ${el.buyer.contacts.tel}` : ``
              }${(el?.buyer?.name || el?.buyer?.contacts?.tel) ? ` ]` : ``}`

            return {mode:el.nr.mode, doc:NormalizeNr(el.nr), info, net:ZLnet, sum:ZLsum}
            
          })
          
          setFi([...fi, [top, ...FSdata, ...ZLdata]])

        }
      )
    }
  )

}

const BTN_CLICK = (action, fi, setFi)=>{

  switch(action.btn) {
    case "Plus":
      setFi(
        fi.map( (month, m)=>
          m === action.month
          ? month.map(
            (line, l)=> l === action.nr ? {...line, edit:!line.edit} : {...line, edit:false}
          )
          : month
        )
      )
      break
    default: break
  }

}