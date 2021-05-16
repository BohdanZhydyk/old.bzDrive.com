import React from 'react'

export const TagVideo = ({body, user})=>{
  return(
    <section className="tag flex center">
      <iframe
        className="TagVideo boxShadow"
        title={body}
        src={`https://www.youtube.com/embed/${body}`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </section>
  )
}