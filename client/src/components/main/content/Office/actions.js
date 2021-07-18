
export const GET_STATE = (fn)=> fn({ app:"office", type:"GET_STATE" })

export const GET_MODE = (fn, payload)=> fn({ app:"office", type:"GET_MODE", payload })

export const ADD_INVOICE = (fn, payload)=> fn({ app:"office", type:"ADD_INVOICE"})

export const CHANGE_INPUT = (office, setOffice, action)=>{

  let setData = (el, someone)=>{
    switch(el){

      case "name": return( {...someone, name:action.input.val} )
      case "acc": return( {...someone, account:action.input.val} )
      case "nip": return( {...someone, nip:action.input.val} )

      case "zip": return( {...someone, addr:{...someone.addr, zip:action.input.val} } )
      case "town": return( {...someone, addr:{...someone.addr, town:action.input.val} } )
      case "street": return( {...someone, addr:{...someone.addr, street:action.input.val} } )

      case "tel": return( {...someone, contacts:{...someone.contacts, tel:action.input.val} } )
      case "www": return( {...someone, contacts:{...someone.contacts, www:action.input.val} } )
      case "email": return( {...someone, contacts:{...someone.contacts, email:action.input.val} } )

      default: return(someone)
    }
  }

  let setLine = (line)=>{
    switch(action.input.form){

      case "place": return( {...line, place:action.input.val} )
      case "date": return( {...line, date:action.input.val} )

      case "buyerName": return( { ...line, buyer:setData("name", line.buyer) } )
      case "buyerAcc": return( { ...line, buyer:setData("acc", line.buyer) } )
      case "buyerNIP": return( { ...line, buyer:setData("nip", line.buyer) } )

      case "buyerZIP": return( { ...line, buyer:setData("zip", line.buyer) } )
      case "buyerTown": return( { ...line, buyer:setData("town", line.buyer) } )
      case "buyerStreet": return( { ...line, buyer:setData("street", line.buyer) } )

      case "buyerTel": return( { ...line, buyer:setData("tel", line.buyer) } )
      case "buyerWww": return( { ...line, buyer:setData("www", line.buyer) } )
      case "buyerEmail": return( { ...line, buyer:setData("email", line.buyer) } )

      default: return(line)
    }
  }

  setOffice({
    ...office,
    table: {
      ...office.table,
      lines: office.table.lines.map( (line, nr)=> nr === action.nr ? setLine(line) : line )
    }
  })

}