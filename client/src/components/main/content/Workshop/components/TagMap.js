import React from 'react'

export const TagMap = ({ props:{body, user} })=>{

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
        className="TagMap boxShadow"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2313.1978764022083!2d18.09561581533655!3d54.56526419041234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fdbfeed102bef3%3A0xa5e78aad0d41d4ce!2sbzDrive%20Elektryka%20Samochodowa!5e0!3m2!1spl!2spl!4v1632088778574!5m2!1spl!2spl"
        title={body.tytle}
        allowfullscreen={body.allowfullscreen}
        loading={body.loading}
      ></iframe>
    </section>
  )
}