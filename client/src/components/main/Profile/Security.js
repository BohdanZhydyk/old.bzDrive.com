import { Input } from './Input'


export const Security = ({ props:{inputs, profFn} })=>{
  return(
    <section className="profileSection">

      { inputs.map( (input, i)=> <Input props={{input, profFn}} key={`ProfInputs${i}`} /> ) }

      <div className="inputWrapper flex">

        <div className="profileBtn flex">Zmienić hasło</div>

      </div>

    </section>
  )
}