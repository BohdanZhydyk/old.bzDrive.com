import { Input } from './Input'


export const Information = ({ props:{infos, profFn} })=>{
  return(
    <section className="profileSection">
    
    { infos.map( (input, i)=> <Input props={{input, profFn}} key={`ProfInfos${i}`} /> ) }

      <div className="inputWrapper flex">

        <div className="profileBtn flex">Potwierdzić</div>

      </div>

    </section>
  )
}