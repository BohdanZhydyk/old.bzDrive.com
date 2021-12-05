import React, { useState } from 'react'


export const TagSlider = ({ props:{body, user} })=>{

  let initialSlider = {
    active: 0,
    images: body
  }

  console.log(body)

  const [slider, setSlider] = useState(initialSlider)

  const sliderFn = (action)=>{
    switch(action.type){
      case "SLIDER_BTN_CLICK":
        let len = slider.images.length
        let id = action.data.id
        let dir = action.data.dir

        if(dir === "L")  id -= 1
        if(dir === "R")  id += 1

        if(id === -1)   id = len - 1
        if(id === len)  id = 0

        setSlider({
          ...slider,
          active: id
        })
        break
      default: break
    }
  }

  return(
    <section className="tag">
      <div className="TagSlider">
        <SliderTop slider={slider} user={user} sliderFn={sliderFn} />
        <SliderBottom slider={slider} sliderFn={sliderFn} />
      </div>
    </section>
    
  )
  // {
  //   tag:"slider",
  //   images: [
  //     {txt:string, src:string}, {txt:string, src:string}, ...
  //   ]
  // }
}


const SliderTop = ({slider, user, sliderFn})=>{
  return(
    <div className="sliderTop flex">
    {
      slider.images.map( (image, id)=>{

        switch(id){
          case slider.active:
            return(
              <div className="flex between" key={`tagSlider${image.txt}`}>
                <SliderBtn dir="L" id={id} sliderFn={sliderFn} />
                <SliderImage image={image} user={user} />
                <SliderBtn dir="R" id={id} sliderFn={sliderFn} />
              </div>
            )
          default:
            return(
              <div key={`tagSlider${image.txt[user.lang]}`}></div>
            )
        }

      })
    }
    </div>
  )
}

const SliderBtn = ({dir, id, sliderFn})=>{
  return(
    <div
      className="sliderBtn flex"
      onClick={ ()=> sliderFn({ type:"SLIDER_BTN_CLICK", data:{dir, id} }) }
    >
      <img
        src={`https://autogaz.bzdrive.com/images/slider/sliderBtn${dir}.png`}
        alt={`sliderBtn${dir}`}
      />
    </div>
  )
}

const SliderImage = ({image, user})=>{
  return(
    <div className="sliderImage flex">
      <img src={image.src} alt="sliderImg" />
      <span>{image.txt[user.lang]}</span>
    </div>
  )
}

const SliderBottom = ({slider, sliderFn})=>{
  return(
    <div className="sliderBottom flex">
    {
      slider.images.map( (image, id)=>
        <div
          className={ id === slider.active ? `sliderLineItem sliderLineItem-active flex` : `sliderLineItem flex` }
          onClick={ ()=> sliderFn({ type:"SLIDER_BTN_CLICK", data:{dir:false, id} }) }
          key={`sliderLineItem${id}`}
        ></div>
      )
    }
    </div>
  )
}