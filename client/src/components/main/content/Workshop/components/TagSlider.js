import React, { useState } from 'react'


export const TagSlider = ({ props:{body, user} })=>{
  
  const [slider, setSlider] = useState({
    folder: 0,
    img: 0,
    body
  })

  let image = `${slider.body[slider.folder].imgs[slider.img]}`
  let btnL = `https://files.bzdrive.com/img/ico/sliderBtnL.png`
  let btnR = `https://files.bzdrive.com/img/ico/sliderBtnR.png`
  let btnU = `https://files.bzdrive.com/img/ico/sliderBtnU.png`
  let btnD = `https://files.bzdrive.com/img/ico/sliderBtnD.png`

  let move = (dir)=>{

    let body = slider.body
    let bodyLen = body.length
    let folder = slider.folder
    let folderLen = slider.body[slider.folder].imgs.length
    let img = slider.img

    switch(dir){
      case "U": setSlider({ ...slider, img:0, folder:( folder === 0 ? (bodyLen - 1) : folder - 1 ) }); break;
      case "D": setSlider({ ...slider, img:0, folder:( bodyLen === (folder + 1) ? 0 : folder + 1 ) }); break;
      case "L": setSlider({ ...slider, img:( img === 0 ? (folderLen - 1) : img - 1 ) }); break;
      case "R": setSlider({ ...slider, img:( folderLen === (img + 1) ? 0 : img + 1 ) }); break;
      default: break;
    }
  }

  return(
    <section className="tag">
      <div className="TagSlider flex between stretch">

        <div className="sliderImgBtn L flex" onClick={()=>move('L')}>
          <img src={btnL} alt="Left" />
        </div>

        <img className="Image" src={image} alt="SliderImage" />

        <div className="sliderImgBtn R flex" onClick={()=>move('R')}>
          <img src={btnR} alt="Right" />
        </div>

        <div className="folderPannel">
          <div className="sliderFolderBtn Up flex start" onClick={()=>move('U')}>
            <img src={btnU} alt="Up" />
          </div>
          <span className="sliderTxt flex">{slider.body[slider.folder].txt[user.lang]}</span>
          <div className="sliderFolderBtn Dn flex start" onClick={()=>move('D')}>
            <img src={btnD} alt="Down" />
          </div>
          
        </div>

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