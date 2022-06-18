
export const TagP = ({ props:{body, user} })=>{
  return(
    <section className="tag">
      <div className="TagP flex stretch">

        {body.startImg && <div><img src={body.startImg} alt="startImg" /></div>}

        <p>{body.txt[user.lang]}</p>

        {body.endImg && <div><img src={body.endImg} alt="endImg" /></div>}

      </div>
    </section>
  )
} 