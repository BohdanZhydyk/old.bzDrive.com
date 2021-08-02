import { bzCalc} from './../../../../store/functions'

export const GET_STATE = (fn)=> fn({ app:"office", type:"GET_STATE" })

export const GET_MODE = (fn, payload)=> fn({ app:"office", type:"GET_MODE", payload })

export const ADD_INVOICE = (fn)=> fn({ app:"office", type:"ADD_INVOICE" })

export const SAVE_INVOICE = (fn, payload)=> fn({ app:"office", type:"SAVE_INVOICE", payload })

export const EDIT_INVOICE = (fn, payload)=> fn({ app:"office", type:"EDIT_INVOICE", payload })

export const PRINT_INVOICE = (fn, payload)=> fn({ app:"office", type:"PRINT_INVOICE", payload })

export const DELETE_INVOICE = (fn, payload)=> fn({ app:"office", type:"DELETE_INVOICE", payload })

export const EXIT_PRINT_MODE = (office, setOffice)=> {
  setOffice({ ...office, printing:false })
}

export const EXIT_EDIT_MODE = (office, setOffice)=> {
  setOffice({ ...office, editing:false })
}

export const CHANGE_INPUT = (office, setOffice, action)=>{

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
      case "date":        return{...line, date:action.input.val}

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

export const CHANGE_ARTICLE = (office, setOffice, action)=>{

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

export const LINE_CLICK = (office, setOffice, action)=>{

  let pushArticle = (articles)=>{
    console.log('article', articles)
    let newArr = []
    for(let i=0; i<articles.length; i++){ newArr.push( articles[i] ) }
    newArr.push( {number:false, article:false, price:false, quantity:false, VAT:false} )
    return newArr
  }

  let delArticle = (articles, nr)=>{
    let newArr = []
    for(let i=0; i<articles.length; i++){ i !== nr && newArr.push( articles[i] ) }
    return newArr
  }

  // setOffice({
  //   ...office,
  //   table: {
  //     ...office.table,
  //     lines: office.table.lines.map( (line, nr)=>
  //       line.status === "editing"
  //       ?
  //       {
  //         ...line,
  //         articles: action.act === "delete"
  //           ? delArticle(line.articles, action.nr)
  //           : pushArticle(line.articles)
  //       }
  //       : line
  //     )
  //   }
  // })

}