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
    case "ADD_INVOICE":           ADD_INVOICE(office, setOffice, action);             break;
    case "SAVE_INVOICE":          SAVE_INVOICE(office, setOffice, action);            break;
    case "EDIT_INVOICE":          EDIT_INVOICE(office, setOffice, action);            break;
    case "PRINT_INVOICE":         PRINT_INVOICE(office, setOffice, action);           break;
    case "DELETE_INVOICE":        DELETE_INVOICE(office, setOffice, action);          break;
    case "EXIT_PRINT_EDIT_MODE":  EXIT_PRINT_EDIT_MODE(office, setOffice, action);    break;                           break;
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

    setOffice({ ...office, mode:action.payload, editing:false, printing:false, table:{ lines:data } })

  })

}

let ADD_INVOICE = (office, setOffice, action)=>{

  let letter = ()=>{
    switch(getUser().login){
      case "bz83": return "B"
      case "Vitalii": return "V"
      default: return "X"
    }
  }

  
  bzPost("/office", { newInvoice:getUser().login }, (data)=>{

    let method = "gotówka"
    let date = {
      year:unixToDateTimeConverter().year,
      month:unixToDateTimeConverter().month,
      day:unixToDateTimeConverter().day
    }

    let buyer = {
      name: false, addr: {zip:false, town:false, street:false},
      img: false, contacts: {www:false, email:false, tel:false},
      account: false, nip: false, place: false, user: false
    }

    let newObj = {
      place: data[0].place,
      date: unixToDateTimeConverter(),
      dealer: data[0],
      buyer,
      articles: [ {number:false, article:false, price:"0", quantity:"1", VAT:"23", netto:"0", vat:"0", sum:"0"} ],
      comments: [],
      pay: {method, date},
      invoiceNr: `${letter()}/${unixToDateTimeConverter().year}/${unixToDateTimeConverter().month}/`
    }

    setOffice({ ...office, printing:false, editing: newObj })

  })

}

let SAVE_INVOICE = (office, setOffice, action)=>{

  bzPost("/office", { saveInvoice:action.payload }, (data)=>{ GET_MODE(office, setOffice, {payload:"FS"}) })

}

let EDIT_INVOICE = (office, setOffice, action)=>{

  setOffice({ ...office, printing:false, editing:action.payload })

}

let PRINT_INVOICE = (office, setOffice, action)=>{

  setOffice({ ...office, printing:action.payload, editing:false })

}

let DELETE_INVOICE = (office, setOffice, action)=>{

  bzPost("/office", { deleteInvoice:action.payload }, (data)=>{ GET_MODE(office, setOffice, {payload:"FS"}) })

}

let EXIT_PRINT_EDIT_MODE = (office, setOffice, action)=>{

  setOffice({ ...office, printing:false, editing:false })

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

  setOffice({ ...office, editing: setLine(office.editing) })

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

  setOffice({ ...office, editing: setArticle(office.editing) })

}

let LINE_CLICK = (office, setOffice, action)=>{

  let pushArticle = (articles)=>{
    let newArr = []
    for(let i=0; i<articles.length; i++){ newArr.push( articles[i] ) }
    newArr.push( {number:false, article:false, price:0, quantity:0, VAT:0, netto:0, vat:0, sum:0} )
    return newArr
  }

  let delArticle = (articles, nr)=>{
    let newArr = []
    for(let i=0; i<articles.length; i++){ i !== nr && newArr.push( articles[i] ) }
    return newArr
  }

  let articles = office.editing.articles

  setOffice({
    ...office,
    editing: {
      ...office.editing,
      articles:
        action.act === "plus"
        ? pushArticle(articles)
        : delArticle(articles, action.nr)
    }
  })

}

let PAY_METHOD = (office, setOffice, action)=>{

  let date = {
    year: office.editing.date.year,
    month: office.editing.date.month,
    day: office.editing.date.day,
  }

  setOffice({
    ...office,
    editing: {
      ...office.editing,
      pay: {...office.editing.pay, method:action, date} }
  })

}

let PAY_DATE = (office, setOffice, action)=>{

  setOffice({
    ...office,
    editing: {
      ...office.editing,
      pay: {...office.editing.pay, date:action} }
  })

}