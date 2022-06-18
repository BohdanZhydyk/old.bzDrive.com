
export const TagContacts = ({ props:{body, user} })=>{

  let map = body.filter( (el)=> el.element === "map" )
  let contacts = body.filter( (el)=> el.element !== "map" )

  return(
    <section className="tag">
      <div className="TagContacts flex center stretch wrap">

        <Left props={{map, user}} />
        <Right props={{contacts, user}} />

      </div>
    </section>
  )
}

const Left = ({ props:{map, user} })=>{
  return(        
    <div className="el-L flex">
    {
      map.map( (el, i)=>{
        return(
          <iframe
            className="boxShadow"
            key={`ContactsMap${i}`}
            src={el.content}
            title={el.title}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        )
      })
    }
    </div>
  )
}

const Right = ({ props:{contacts, user} })=>{
  return(
    <div className="el-R flex column start">
    {
      contacts.map( (el, i)=>{
        return(
          <div className="contact" key={`Contact${i}`}>
            <div className="txt">{`${el.txt[user.lang]}:`}</div>
            {
              el.content.link
              ?
              <a className="content"
                href={el.content.link} target="_blank" rel="noreferrer">
                <Info el={el} />
              </a>
              : 
              <div className="content">
                <Info el={el} />
              </div>
            }
          </div>
        )
      })
    }
    </div>
  )
}

const Info = ({ el })=>{
  return(
    <section className="line flex between stretch">
      <img className="imgBtn" src={el.content.img} alt={el.element} />
      <div className="contentTxt flex end wrap">
      {
        el.content.txt.map( (txt, n)=>{
          return(
            <div className="el flex end" key={`ContTxt${el.element + n}`}>
              {txt}
            </div>
          )
        })
      }
      </div>
    </section>
  )
}