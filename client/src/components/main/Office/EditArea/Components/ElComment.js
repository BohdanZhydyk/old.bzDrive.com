import React from 'react'


export const ElComment = ({ props:{comments, print, AreaFn} })=>{

  let CHANGE_TEXTAREA = (e)=> AreaFn({type:`CHG_COMMENTS`, value:e.target.value})

  let placeholder = comments === "" ? "wprowadź dane..." : ""

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
            {comments}
          </textarea>
          :
          <div className="CommentsTxt">{comments}</div>
        }

      </div>
    }
    </>
  )
}