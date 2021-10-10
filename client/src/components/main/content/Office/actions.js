import {
  bzPost,
  setUser,
  getUser,
  remUser,
  setToken,
  getToken,
  remToken,
  bzCalc,
  inputDateToStandart,
  unixToDateTimeConverter
} from './../../../../store/functions'

export const actions = (action, office, setOffice)=>{
  switch(action.type){
    case "GET_STATE":             GET_STATE(office, setOffice, action);               break;
    case "GET_MODE":              GET_MODE(office, setOffice, action);                break;
    case "ADD_NEW":               ADD_NEW(office, setOffice, action.payload);         break;
    case "SAVE":                  SAVE(office, setOffice, action);                    break;
    case "DELETE":                DELETE(office, setOffice, action);                  break;
    case "EDIT":                  EDIT(office, setOffice, action);                    break;
    case "PRINT":                 PRINT(office, setOffice, action);                   break;
    case "EXIT_PRINT_EDIT_MODE":  EXIT_PRINT_EDIT_MODE(office, setOffice, action);    break;
    case "CHANGE_INPUT":          CHANGE_INPUT(office, setOffice, action.payload);    break;
    case "CHANGE_ARTICLE":        CHANGE_ARTICLE(office, setOffice, action.payload);  break;
    case "LINE_CLICK":            LINE_CLICK(office, setOffice, action.payload);      break;
    case "PAY_METHOD":            PAY_METHOD(office, setOffice, action.payload);      break;
    case "PAY_DATE":              PAY_DATE(office, setOffice, action.payload);        break;
    default: break;
  }
}

let GET_STATE = (office, setOffice, action)=>{

  bzPost("/office", { getState:true }, (data)=>{ setOffice({btns:data.btns}) })

}

let GET_MODE = (office, setOffice, action)=>{
  
  bzPost("/office", { getMode:action.payload }, (data)=>{

    setOffice({ ...office, mode:action.payload, table:data })

  })

}

let ADD_NEW = (office, setOffice, payload)=>{

  bzPost("/office", { new:getUser().login }, (data)=>{

    let newObj

    if(payload === "FS"){
    
      let letter = ()=>{
        switch(getUser().login){
          case "bz83": return "B"
          case "Vitalii": return "V"
          default: return "X"
        }
      }
  
      newObj = {
        _id: "new",
        edi:true,
        place: data[0].place,
        date: unixToDateTimeConverter(),
        dealer: data[0],
        buyer:{
          name: false, addr: {zip:false, town:false, street:false},
          img: false, contacts: {www:false, email:false, tel:false},
          account: false, nip: false, place: false, user: false
        },
        articles: [{
          number:false, article:false, price:0.00, quantity:1,
          VAT:23, netto:0.00, vat:0.00, sum:0.00
        }],
        comments: [],
        pay: {
          method:"gotówka",
          date:{
            year:unixToDateTimeConverter().year,
            month:unixToDateTimeConverter().month,
            day:unixToDateTimeConverter().day
          }
        },
        invoiceNr: `${letter()}/${unixToDateTimeConverter().year}/${unixToDateTimeConverter().month}/`
      }
  
    }

    if(payload === "ZL"){

      newObj = {
        _id: "new",
        edi:true,
        place: data[0].place,
        date: unixToDateTimeConverter(),
        dealer: data[0]
      }
  
    }

    setOffice({ ...office, table:[newObj, ...office.table] })

  })

}

let EDIT = (office, setOffice, action)=>{

  setOffice({
    ...office,
    table: office.table.map( el=> el._id === action.payload._id ? {...el, edi:true} : {...el, edi:false} )
  })

}

let SAVE = (office, setOffice, action)=>{

  bzPost("/office", { save:action.payload, mode:office.mode }, (data)=>{
    GET_MODE(office, setOffice, {payload:office.mode})
  })

}

let DELETE = (office, setOffice, action)=>{

  bzPost("/office", { delete:action.payload, mode:office.mode }, (data)=>{
    GET_MODE(office, setOffice, {payload:office.mode})
  })

}

let PRINT = (office, setOffice, action)=>{

  setOffice({ ...office, printing:action.payload, editing:false })

  setOffice({
    ...office,
    table: office.table.map( el=> el._id === action.payload._id
      ? {...el, pri:true, edi:false}
      : {...el, pri:false, edi:false}
    )
  })

}

let EXIT_PRINT_EDIT_MODE = (office, setOffice, action)=>{

  let newTable = office.table.filter( (el)=> el.invoiceNr.length > 11 )

  setOffice({
    ...office,
    table: newTable.map( el=>{ return({...el, pri:false, edi:false}) }  )
  })

}

let CHANGE_INPUT = (office, setOffice, action)=>{

  let setData = (el, someone)=>{
    switch(el){

      case "name":    return{...someone, name:action.input.val}
      case "acc":     return{...someone, account:action.input.val}
      case "nip":     return{...someone, nip:action.input.val}

      case "zip":     return{...someone, addr:{...someone.addr, zip:action.input.val} }
      case "town":    return{...someone, addr:{...someone.addr, town:action.input.val} }
      case "street":  return{...someone, addr:{...someone.addr, street:action.input.val} }

      case "tel":     return{...someone, contacts:{...someone.contacts, tel:action.input.val} }
      case "www":     return{...someone, contacts:{...someone.contacts, www:action.input.val} }
      case "email":   return{...someone, contacts:{...someone.contacts, email:action.input.val} }

      default: return(someone)
    }
  }

  let setLine = (line)=>{
    switch(action.input.form){

      case "place":       return{...line, place:action.input.val}
      case "date":        return{...line, date:inputDateToStandart(action.input.val)}

      case "buyerName":   return{ ...line, buyer:setData("name", line.buyer) }
      case "buyerAcc":    return{ ...line, buyer:setData("acc", line.buyer) }
      case "buyerNIP":    return{ ...line, buyer:setData("nip", line.buyer) }

      case "buyerZIP":    return{ ...line, buyer:setData("zip", line.buyer) }
      case "buyerTown":   return{ ...line, buyer:setData("town", line.buyer) }
      case "buyerStreet": return{ ...line, buyer:setData("street", line.buyer) }

      case "buyerTel":    return{ ...line, buyer:setData("tel", line.buyer) }
      case "buyerWww":    return{ ...line, buyer:setData("www", line.buyer) }
      case "buyerEmail":  return{ ...line, buyer:setData("email", line.buyer) }

      default: return line
    }
  }

  setOffice({
    ...office,
    table: office.table.map( line=> line._id === action.id ? setLine(line) : line )
  })

}

let CHANGE_ARTICLE = (office, setOffice, action)=>{

  let calc = (article, price, quantity, VAT, netto, vat, sum)=>{
    price = price ? price : article.price
    quantity = quantity ? quantity : article.quantity
    VAT = VAT ? VAT : article.VAT
    netto = bzCalc( '*', price, quantity )
    vat = bzCalc( 'VAT', VAT, netto )
    sum = bzCalc( '+', vat, netto )
    return {...article, price, quantity, VAT, netto, vat, sum}
  }

  let setData = (el, n, article)=>{
    switch(el){
      
      case "number":
        return( n === action.nr ? {...article, number:action.val} : article )
      case "article":
        return( n === action.nr ? {...article, article:action.val} : article )
      case "price":
        return( n === action.nr ? calc(article, action.val, false, false, false, false, false) : article )
      case "quantity":
        return( n === action.nr ? calc(article, false, action.val, false, false, false, false) : article )
      case "VAT":
        return( n === action.nr ? calc(article, false, false, action.val, false, false, false) : article )

      default: return(article)
    }
  }

  let setArticle = (line)=>{
    switch(action.form){

      case "number":
        return{...line, articles:line.articles.map( (article, n)=> setData("number", n, article) )}
      case "article":
        return{ ...line, articles:line.articles.map( (article, n)=> setData("article", n, article) )}
      case "quantity":
        return{ ...line, articles:line.articles.map( (article, n)=> setData("quantity", n, article) )}
      case "VAT":
        return{ ...line, articles:line.articles.map( (article, n)=> setData("VAT", n, article) )}
      case "price":
        return{ ...line, articles:line.articles.map( (article, n)=> setData("price", n, article) )}

      default: return line 
    }
  }

  setOffice({
    ...office,
    table: office.table.map( line=> line._id === action.id ? setArticle(line) : line )
  })

}

let LINE_CLICK = (office, setOffice, action)=>{

  let pushArticle = (articles)=>{
    let newArr = []
    for(let i=0; i<articles.length; i++){ newArr.push( articles[i] ) }
    newArr.push( {number:false, article:false, price:0, quantity:1, VAT:23, netto:0, vat:0, sum:0} )
    return newArr
  }

  let delArticle = (articles, nr)=>{
    let newArr = []
    for(let i=0; i<articles.length; i++){ i !== nr && newArr.push( articles[i] ) }
    return newArr
  }

  setOffice({
    ...office,
    table: office.table.map( line=>{
      return(
        line._id === action.id
        ?
        {
          ...line,
          articles:
            action.act === "plus"
            ? pushArticle(line.articles)
            : delArticle(line.articles, action.nr)
        }
        : line 
      )
    })
  })

}

let PAY_METHOD = (office, setOffice, action)=>{

  setOffice({
    ...office,
    table: office.table.map( line=>{
      return(
        line._id === action.id
        ? {...line, pay:{...line.pay, method:action.method}}
        : line 
      )
    })
  })

}

let PAY_DATE = (office, setOffice, action)=>{

  setOffice({
    ...office,
    table: office.table.map( line=>{
      return(
        line._id === action.id
        ? {...line, pay:{...line.pay, date:action.date}}
        : line 
      )
    })
  })

}