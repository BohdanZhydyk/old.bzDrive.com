
import { bzPost, bzGetUser, bzUnixToYYYYMMDD } from "../../../../state/functions"
import { officeFn } from "./../actions"


export const Fn = (action, fi, setFi)=>{

  switch(action.type){
    case "GET_FI":        GET_FI(action, fi, setFi);          break
    case "GET_FINANCES":  GET_FINANCES(action, fi, setFi);    break
    case "BTN_CLICK":     BTN_CLICK(action, fi, setFi);       break
    default: break
  }

}

const GET_FI = (action, fi, setFi)=>{
  bzPost( "/getOffice", { getFI:true }, (data)=>{
    let monthNow = {"date": parseInt( bzUnixToYYYYMMDD() / 100 )}
    setFi( monthNow === data[0].date ? data : [monthNow, ...data] )
  })
}

const GET_FINANCES = (action, fi, setFi)=>{

  setFi(  fi.map( (el, i)=> i === action.nr ? {...el, base:false} : el ) )

  officeFn(
    {
      type:"GET_TABLE",
      mode:"ZU",
      query: {"nr.from":action.dates, user:bzGetUser().login}
    },
    (data)=>{

      let ZUdata = data.reverse()

      officeFn(
        {
          type:"GET_TABLE",
          mode:"FS",
          query: {"nr.from":action.dates, user:bzGetUser().login}
        },
        (data)=>{
    
          let FSdata = data.reverse()

          officeFn(
            {
              type:"GET_TABLE",
              mode:"FZ",
              query: {"nr.from":action.dates, user:bzGetUser().login}
            },
            (data)=>{
        
              let FZdata = data.reverse()

              officeFn(
                {
                  type:"GET_TABLE",
                  mode:"ZL",
                  query: {"nr.to":action.dates}
                },
                (data)=>{
          
                  let ZLdata = data.reverse()

                  officeFn(
                    {
                      type:"GET_TABLE",
                      mode:"PS",
                      query: {"nr.from":action.dates}
                    },
                    (data)=>{
              
                      let PSdata = data.reverse()

                      officeFn(
                        {
                          type:"GET_TABLE",
                          mode:"PZ",
                          query: {"nr.from":action.dates}
                        },
                        (data)=>{
                  
                          let PZdata = data.reverse()
          
                          setFi(
                            fi.map( (el, i)=>
                              i === action.nr
                              ? {
                                  ...el,
                                  base:[
                                    ...ZUdata,
                                    ...FSdata,
                                    ...PSdata,
                                    ...PZdata,
                                    ...FZdata,
                                    ...ZLdata
                                  ]
                                }
                              : el
                            )
                          )

                        }
                      )

                    }
                  )

                }
              )

            }
          )

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
          ? {
              ...month,
              base: month.base.map(
                (line, l)=> l === action.nr ? {...line, edit:!line.edit} : {...line, edit:false}
              )
            }
          : month
        )
      )
      break
    case "Edit":
      setFi(
        fi.map( (month, m)=>
          m === action.month
          ? {
              ...month,
              base: month.base.map(
                (line, l)=> l === action.nr ? {...line, edit:!line.edit} : {...line, edit:false}
              )
            }
          : month
        )
      )
      break
    default: break
  }

}