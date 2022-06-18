import { NavLink } from 'react-router-dom'


export const Protection = ({ props:{profFn} })=>{
  return(
    <section className="profileSection">

      <NavLink to="/cookies" className="inputWrapper flex start">

        <span className="cookies flex">{`Polityka prywatności i wykorzystywania plików „cookies”.`}</span>
      
      </NavLink>

    </section>
  )
}