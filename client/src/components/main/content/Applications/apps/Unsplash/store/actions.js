import axios from 'axios'


export const CHANGE_INPUT = (state, payload, setState)=>{

  let value = payload
  let queries = []
  let tags = []

  if( payload.length > 2 ){

    axios.get( "https://api.unsplash.com/search/collections?client_id="+state.clientId+"&query="+value )
    .then( (res)=>{
      for(let i=0; i<res.data.results.length; i++){
        let item = res.data.results[i]
        if( item.title.includes(value) ){
          queries.push( {query:item.title, photos:item.links.photos} )
        }
        for(let n=0; n<item.tags.length; n++){
          let tag = item.tags[n]
          if( tag.type === "search" && tags.length < 9  ){
            tags.push( {text:tag.title} )
          }
        }
      }

      if(queries.length < 1){
        queries.push( {query:"there are no results!!!", photos:[]} )
      }

      setState({
        ...state, main:{
          ...state.main, input:{
            ...state.main.input, search:true, value, queries, tags
          }
        }
      })

    })

  }
  else{
    setState({
      ...state, main:{
        ...state.main, input:{
          ...state.main.input, search:false, value, queries, tags
        }
      }
    })
  }

}

export const CLEAR_INPUT = (state, payload, setState)=>{
  setState({
    ...state, main:{
      ...state.main, input:{
        ...state.main.input, value:payload, search:false, queries:[]
      }
    }
  })
}

export const CLICK_QUERY = (state, payload, setState)=>{

  if(payload.photos === ""){return}
  
  axios.get(payload.photos+"?client_id="+state.clientId+"&orientation=landscape")
  .then( (res)=>{
    let photos = []
    for(let i=0; i<res.data.length; i++){
      let item = res.data[i]
      photos.push(
        {
          id: i,
          link: {small:item.urls.small, big:item.urls.regular},
          ava: item.user.profile_image.large,
          author: item.user.name,
          instagram: item.user.instagram_username,
          location: item.user.location
        }
      )
    }
    setState({
      ...state,
      photos,
      main:{
        ...state.main, input:{
          ...state.main.input,
          value:payload.query,
          key:payload.query,
          search:false
        }
      }
    })

  })
}

export const CLICK_PHOTO = (state, payload, setState)=>{
  setState({
    ...state,
    modal:{
      active:true,
      id:payload.id,
      ava:payload.ava,
      photo:payload.link.big,
      author:payload.author,
      instagram:payload.instagram,
      location:payload.location
    }
  })
}

export const SLIDER_BTN = (state, payload, setState)=>{

  let id, count = state.photos.length
  if(payload.dir === "right"){id = payload.id + 1}
  if(payload.dir === "left"){id = payload.id - 1}
  if(id === count){ id = 0 }
  if(id === -1){ id = count - 1 }
  setState({
    ...state,
    modal:{
      active:true,
      id:state.photos[id].id,
      ava:state.photos[id].ava,
      photo:state.photos[id].link.big,
      author:state.photos[id].author,
      instagram:state.photos[id].instagram,
      location:state.photos[id].location
    }
  })
}

export const CLOSE_WINDOW = (state, payload, setState)=>{
  setState({ ...state, modal:[] })
}