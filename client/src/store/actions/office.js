import {
  bzPost,
  setUser,
  getUser,
  remUser,
  setToken,
  getToken,
  remToken,
  unixToDateConverter,
  unixToYearMonthConverter
} from './../functions'

export const office = (action, state, setState)=>{
  switch(action.type){
    case "GET_STATE":	      GET_STATE(action, state, setState); 	    break;
    case "GET_MODE":	      GET_MODE(action, state, setState); 	      break;
    case "ADD_INVOICE":	    ADD_INVOICE(action, state, setState);     break;
    case "SAVE_INVOICE":	  SAVE_INVOICE(action, state, setState);    break;
    case "EDIT_INVOICE":	  EDIT_INVOICE(action, state, setState);    break;
    case "PRINT_INVOICE":	  PRINT_INVOICE(action, state, setState);   break;
    case "DELETE_INVOICE":	DELETE_INVOICE(action, state, setState);  break;
    case "EXIT_PRINT_MODE":	EXIT_PRINT_MODE(action, state, setState); break;
    case "EXIT_EDIT_MODE":	EXIT_EDIT_MODE(action, state, setState);  break;
    default: break
  }
}

const GET_STATE = (action, state, setState)=>{
    
  bzPost("/office", { getState:true }, (data)=>{

    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>
          (item.to === "/office")
          ? {...item, content:data}
          : {...item, content:false}
        )
      },
      user: getUser()
    })

  })

}

const GET_MODE = (action, state, setState)=>{
    
  bzPost("/office", { getMode:action.payload }, (data)=>{

    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>
          (item.to === "/office")
          ?
          {
            ...item,
            content: {
              ...item.content,
              mode:action.payload,
              editing:false,
              printing:false,
              table:{ lines:data }
            }
          }
          :
          {...item, content:false}
        )
      },
      user: getUser()
    })

  })

}

const ADD_INVOICE = (action, state, setState)=>{

  let letter = ()=>{
    switch(getUser().login){
      case "bz83": return "B"
      case "Vitalii": return "V"
      default: return "X"
    }
  }

  bzPost("/office", { newInvoice:getUser().login }, (data)=>{

    let buyer = {
      name: false, addr: {zip:false, town:false, street:false},
      img: false, contacts: {www:false, email:false, tel:false},
      account: false, nip: false, place: false, user: false
    }

    let newObj = {
      place: data[0].place,
      date: unixToDateConverter(),
      dealer: data[0],
      buyer,
      articles: [ {number:false, article:false, price:0, quantity:0, VAT:0, netto:0, vat:0, sum:0} ],
      comments: [`
        Dostawa towarów lub świadczenie usług zwolnionych od podatku
        VAT na podstawie art. 113 ust. 1 i 9 ustawy o VAT.
      `],
      invoiceNr: `${letter()}/${unixToYearMonthConverter()}/`
    }

    setState({
      ...state,
      drive: {
        ...state.drive,
        nav: state.drive.nav.map( (item, index)=>
          (item.to === "/office")
          ? { ...item, content: { ...item.content, printing:false, editing: newObj } }
          : {...item, content:false}
        )
      },
      user: getUser()
    })

  })

}

const SAVE_INVOICE = (action, state, setState)=>{

  bzPost("/office", { saveInvoice:action.payload }, (data)=>{ GET_MODE({payload:"FA"}, state, setState) })

}

const EDIT_INVOICE = (action, state, setState)=>{

  setState({
    ...state,
    drive: {
      ...state.drive,
      nav: state.drive.nav.map( (item, index)=>
        (item.to === "/office")
        ?
        {
          ...item,
          content: {
            ...item.content,
            printing:false,
            editing:action.payload
          }
        }
        : {...item, content:false}
      )
    },
    user: getUser()
  })

}

const PRINT_INVOICE = (action, state, setState)=>{

  setState({
    ...state,
    drive: {
      ...state.drive,
      nav: state.drive.nav.map( (item, index)=>
        (item.to === "/office")
        ? { ...item, content: { ...item.content, printing:action.payload, editing:false } }
        : {...item, content:false}
      )
    },
    user: getUser()
  })

}

const DELETE_INVOICE = (action, state, setState)=>{

  bzPost("/office", { deleteInvoice:action.payload._id }, (data)=>{ GET_MODE({payload:"FA"}, state, setState) })

}

const EXIT_PRINT_MODE = (action, state, setState)=>{

  setState({
    ...state,
    drive: {
      ...state.drive,
      nav: state.drive.nav.map( (item, index)=>
        (item.to === "/office")
        ? { ...item, content: { ...item.content, printing:false, editing:false } }
        : {...item, content:false}
      )
    },
    user: getUser()
  })

}

const EXIT_EDIT_MODE = (action, state, setState)=>{

  setState({
    ...state,
    drive: {
      ...state.drive,
      nav: state.drive.nav.map( (item, index)=>
        (item.to === "/office")
        ? { ...item, content: { ...item.content, printing:false, editing:false } }
        : {...item, content:false}
      )
    },
    user: getUser()
  })

}