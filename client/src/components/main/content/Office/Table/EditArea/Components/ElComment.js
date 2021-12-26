import React from "react"


export const ElComment = ({ props:{comments, edit, AreaFn} })=>{

  let CHANGE_TEXTAREA = (e)=> AreaFn({form:`Comments`, value:e.target.value})

  let placeholder = comments === "" ? "wprowadź dane..." : ""

  return(
    <>
    {
      (comments || edit) &&
      <div className="ElComment flex wrap">


        <div className="title bold flex start">
          {"Uwagi"}
        </div>

        {
          edit
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