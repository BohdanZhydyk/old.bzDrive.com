import React from 'react'

export const TagVideo = ({body, user})=>{

  const allow = `
    accelerometer;
    autoplay;
    clipboard-write;
    encrypted-media;
    gyroscope;
    picture-in-picture
  `
  return(
    <section className="tag flex center">
      <iframe
        className="TagVideo boxShadow"
        title={body}
        src={`https://www.youtube.com/embed/${body}`}
        frameBorder="0"
        allow={allow}
        allowFullScreen
      ></iframe>
    </section>
  )
}