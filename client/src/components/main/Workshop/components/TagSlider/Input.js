
export const Input =({ props:{legend, val, n, sliderFn} })=>{

  let CHANGE_INPUT = (e)=> sliderFn({type:"INPUT_CHG", folder:n, lang:legend, value:e.target.value})

  let placeholder = "wprowadź dane..."

  return(
    <fieldset className="SliderEditInput flex wrap">

      <legend>{legend}</legend>

      <input
        type="text"
        placeholder={ placeholder }
        value={ val }
        onChange={ (e)=> CHANGE_INPUT(e) }
      />

    </fieldset>
  )
}