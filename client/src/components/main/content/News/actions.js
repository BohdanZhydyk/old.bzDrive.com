import {
  bzPost,
  setUser,
  getUser,
  remUser,
  setToken,
  getToken,
  remToken,
  bzCalc,
  unixToDateConverter,
  unixToDateTimeConverter,
  unixToYearMonthConverter
} from './../../../../store/functions'

export const actions = (action, news, setNews)=>{
  switch(action.type){
    case "GET_STATE":     GET_STATE(action, news, setNews);     break;
    case "ADD_NEWS":      ADD_NEWS(action, news, setNews);      break;
    case "EDIT_NEWS":     EDIT_NEWS(action, news, setNews);     break;
    case "SAVE_NEWS":     SAVE_NEWS(action, news, setNews);    break;
    case "DELETE_NEWS":   DELETE_NEWS(action, news, setNews);   break;
    case "CHANGE_INPUT":  CHANGE_INPUT(action, news, setNews);  break;
    case "ADD_TAG":       ADD_TAG(action, news, setNews);       break;
    case "LIKE_CLICK":    LIKE_CLICK(action, news, setNews);    break;
    default: break
  }
}

function getTag(tag){
  switch(tag){
    case "h4":
      return {inn:(Date.now()+1), tag: "h4", data: "write header here..."}
    case "p":
      return {inn:(Date.now()+2), tag: "p", data: "write paragraph here..."}
    default: return
  }
}

let GET_STATE = (action, news, setNews)=>{

  bzPost("/news", { getState:true }, (data)=> setNews(data) )

}

let ADD_NEWS = (action, news, setNews)=>{

  let newNews = {
    top: {
      author: getUser().login,
      lng: getUser().lang,
      dateTime: unixToDateTimeConverter(),
      theme: "theme of the news..."
    },
    content: [ getTag("h4"), getTag("p") ],
    bottom: {
      likes: [],
      unix: Date.now()
    }
  }

  bzPost("/news", {add:true, data:newNews}, (data)=> setNews(data.ops) )

}

let EDIT_NEWS = (action, news, setNews)=>{
  let array = []
  news.map( (item)=> item._id === action.payload && array.push({...item, edit:true}) )
  setNews(array)
}

let SAVE_NEWS = (action, news, setNews)=>{
  news.map( (item)=>
    item._id === action.payload &&
    bzPost("/news", {save:true, data:action.payload}, (data)=> setNews(data) )
  )
}

let DELETE_NEWS = (action, news, setNews)=>{
  bzPost("/news", {delete:true, data:action.payload}, (data)=> setNews(data) )
}

let CHANGE_INPUT = (action, news, setNews)=>{
  if(action.payload.nr === "theme"){
    setNews([
      ...news.map( (item)=>{
        return {
          ...item,
          top: {
            ...item.top,
            theme: action.payload.value
          }
        }
      })
    ])
  }
  else{
    setNews([
      ...news.map( (item)=>{
        return {
          ...item,
          content: item.content.map( (el)=>
            el.inn === action.payload.nr
            ? {...el, data: action.payload.value}
            : {...el}
          )
        }
      })
    ])
  }
}

let ADD_TAG = (action, news, setNews)=>{

  let newArray = []

  if(action.payload.inn === "start"){
    newArray.push( getTag(action.payload.tag) )
  }

  for(let i=0; i<news[0].content.length; i++){
    newArray.push(news[0].content[i])
    if(news[0].content[i].inn === action.payload.inn){
      newArray.push( getTag(action.payload.tag) )
    }
  }

  setNews([
    ...news.map( (item)=>{
      return { ...item, content: newArray }
    })
  ])

}

let LIKE_CLICK = (action, news, setNews)=>{
  // news.map( (item)=>
  //   item._id === action.payload.id &&
  //   fn({
  //     app: "news",
  //     type: "SAVE_NEWS",
  //     payload:{ ...item, bottom:{...item.bottom, likes:action.payload.likes} }
  //   })
  // )
}