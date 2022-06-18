import { translate } from "../../state/translate"


export const Copyright = ({ props:{author, user, link} })=>{

  let lang = user.lang
  let cl = ['txtOrg', 'txtWht', 'txtOrg', 'txtWht', 'txtOrg', 'txtWht']
  let href = `https://${link[0] + link[1] + link[2]}/`

  return (
    <div className="flex end">

      <span className="group flex">
        <span>{ `${translate(lang, "created")}:`}</span>
      </span>

      <span className="group flex">
      {
        author.map( (el, i)=> <span className={`${cl[i]} bold`} key={`Author${i}`}>{el}</span> )
      }
      </span>

      <span className="group flex">
      {
        link.map( (el, i)=>{
          return(
            <a href={href} target="_blank" rel="noreferrer" key={`Link${i}`} >
              <span className={`${cl[i]} bold`}>{el}</span>
            </a>
          )
          
        })
      }
      </span>

      <span className="group flex">
        <span>&copy;</span>
      </span>

      <span className="group flex">
        <span>{`2018-${ new Date().getFullYear() }`}</span>
      </span>

    </div>
  )
}