import React from 'react'


export const ElComment = ({ props:{comments, print, AreaFn} })=>{

  let CHANGE_TEXTAREA = (e)=> AreaFn({type:`CHG_COMMENTS`, value:e.target.value})

  let placeholder = (!comments || comments === "") ? "wprowadź dane..." : ""

  return(
    <>
    {
      (comments || !print) &&
      <div className="ElComment flex wrap">

        <div className="title bold flex start">
          {"Uwagi"}
        </div>

        {
          !print
          ?
          <textarea className="CommentsTxt" placeholder={placeholder} onChange={ (e)=> CHANGE_TEXTAREA(e) }>
            {!comments ? "" : comments}
          </textarea>
          :
          // <div className="CommentsTxt">{comments}</div>
          <div className="CommentsTxt">
          {
            (!comments || comments === "")
            ? ""
            : comments.split('\n').map( (el, l)=>{
              let key = `CommentsLine_${l}_${Math.floor(Math.random() * 5)}`
                return (<div className="CommentsLine flex start" key={key}>{el}</div>)
              })
          }
        </div>
        }

      </div>
    }
    </>
  )
}