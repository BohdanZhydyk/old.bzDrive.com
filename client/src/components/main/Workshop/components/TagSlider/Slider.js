
export const Slider = ({ props:{admin, txt, image, sliderFn} })=>{

  let btnL = `https://files.bzdrive.com/img/ico/sliderBtnL.png`
  let btnR = `https://files.bzdrive.com/img/ico/sliderBtnR.png`
  let btnEdit = `https://files.bzdrive.com/img/ico/icoEdit.png`

  let SLIDE_LEFT = ()=> sliderFn({type:"SLIDE_LEFT"})
  let SLIDE_RIGHT = ()=> sliderFn({type:"SLIDE_RIGHT"})
  let EDIT = ()=> sliderFn({type:"EDIT"})

  return(
    <div className="Slider flex stretch wrap">

      <span className="sliderTxt flex">{txt}</span>

      <img className="Image" src={image} alt="SliderImage" />

      <div className="sliderImgBtn L flex" onClick={ ()=>SLIDE_LEFT() }>
        <img src={btnL} alt="Left" />
      </div>

      <div className="sliderImgBtn R flex" onClick={ ()=>SLIDE_RIGHT() }>
        <img src={btnR} alt="Right" />
      </div>

      { admin && <img className="EditBtn imgBtn" src={btnEdit} onClick={ ()=>EDIT() } alt="edit" /> }

    </div>
  )
}