import React from 'react'

import { timeConverter } from './../../../../../store/functions'


export const AddNews = ({user, fn})=>{

  let newNews = {
    top: {
        author: user.login,
        lng: user.lang,
        dateTime: timeConverter(),
        theme: "theme of the news..."
    },
    content: [
        {
            tag: "h4",
            data: "write header here..."
        },
        {
            tag: "p",
            data: "write paragraph here..."
        }
    ],
    bottom: {
        unix: Date.now()
    }
  }

let ADD_NEWS = ()=> fn({ app: "news", type: "ADD_NEWS", payload:newNews })

  return (
    <div className="container flex txtOrg">
      <span onClick={ ()=> ADD_NEWS() }>Add New</span>
    </div>
  )
}