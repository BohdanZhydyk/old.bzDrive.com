import { unixToDateTimeConverter } from './../../../../store/functions'


function getTag(tag){
  switch(tag){
    case "h4":
      return {inn:(Date.now()+1), tag: "h4", data: "write header here..."}
    case "p":
      return {inn:(Date.now()+2), tag: "p", data: "write paragraph here..."}
    default: return
  }
}


export const GET_STATE = (fn)=> fn({ app:"news", type:"GET_STATE" })

export const ADD_NEWS = (user, fn)=>{
  let newNews = {
    top: {
      author: user.login,
      lng: user.lang,
      dateTime: unixToDateTimeConverter(),
      theme: "theme of the news..."
    },
    content: [ getTag("h4"), getTag("p") ],
    bottom: { unix: Date.now() }
  }
  fn({ app: "news", type: "ADD_NEWS", payload:newNews })
}

export const EDIT_NEWS = (action, news, setNews)=>{
  let array = []
  news.map( (item)=> item._id === action.payload && array.push({...item, edit:true}) )
  setNews(array)
}

export const SAVE_NEWS = (action, news, fn)=>{
  news.map( (item)=>
    item._id === action.payload &&
    fn({ app: "news", type: "SAVE_NEWS", payload:item })
  )
}

export const DELETE_NEWS = (action, fn)=>{
  fn({ app: "news", type: "DELETE_NEWS", payload:action.payload })
}

export const CHANGE_INPUT = (action, news, setNews)=>{
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

export const ADD_TAG = (action, news, setNews)=>{

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