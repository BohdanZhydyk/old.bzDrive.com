import { useState, useEffect } from 'react'

import { actions } from './actions'
import { Slider } from './Slider'
import { SliderEdit } from './SliderEdit'


const TagSlider = ({ props:{body, user} })=>{

  let admin = user?.role === "admin"

  const [slider, setSlider] = useState(body)
  const [edit, setEdit] = useState(false)
  const [folder, setFolder] = useState(0)
  const [img, setImg] = useState(0)

  let txt = ""
  slider[folder].txt.map( (text)=> txt = (text.name === user.lang) ? text.val : txt )

  let image = slider[folder].imgs[img]

  let sliderFn = (action)=> actions(action, edit, setEdit, img, setImg, folder, setFolder, slider, setSlider)
 
  useEffect(() => {
    const int = setInterval( ()=>sliderFn({type:"SLIDE_RIGHT"}), 3000 )
    return () => clearInterval(int)
  }, [img])

  // console.log(slider)

  return(
    <section className="tag">
      <div className="TagSlider">
      {
        !edit
        ? <Slider props={{admin, txt, image, sliderFn}} />
        : <SliderEdit props={{slider, sliderFn}} />
      } 
      </div>
    </section>
  )
}

export default TagSlider