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
    case "GET_STATE":	    GET_STATE(action, state, setState); 	  break;
    case "GET_MODE":	    GET_MODE(action, state, setState); 	    break;
    case "ADD_INVOICE":	  ADD_INVOICE(action, state, setState);   break;
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
              btns:{
                ...item.content.btns,
                btnsMode:action.payload
              },
              table:{
                lines:data
              }
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

  bzPost("/office", { addInvoice:getUser().login }, (data)=>{

    let newLines = (lines)=>{

      let array = []

      let newObj = {
        status: "editing",
        place: data[0].place,
        date: unixToDateConverter(),
        dealer: data[0],
        buyer: {
          name: false,
          addr: {zip:false, town:false, street:false},
          img: false,
          contacts: {www:false, email:false, tel:false},
          account: false,
          nip: "",
          place: false,
          shortName: true,
          user: false
        },
        articles: [ {number:false, article:false, price:false, quantity:false, VAT:false} ],
        comments: [
          `Dostawa towarów lub świadczenie usług zwolnionych od podatku VAT na podstawie art. 113 ust. 1 i 9 ustawy o VAT.`
        ],
        invoiceNr: `${unixToYearMonthConverter()}/------`
      }

      for(let i=0; i<lines.length; i++){
        if(i===0){
          array.push(newObj);
          array.push(lines[0]);
        }
        else{array.push(lines[i]);}
      }

      return(array)
    }

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
              table:{
                ...item.content.table,
                lines: newLines(item.content.table.lines)
              }
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