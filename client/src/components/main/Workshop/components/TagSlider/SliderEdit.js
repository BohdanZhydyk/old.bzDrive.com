import React from 'react'
import { Input } from './Input'
import { SliderEditImg } from './SliderEditImg'


export const SliderEdit = ({ props:{slider, sliderFn} })=>{

  let btnSave = `https://files.bzdrive.com/img/ico/icoSave.png`
  let btnCancel = `https://files.bzdrive.com/img/ico/icoCancel.png`

  let SAVE = ()=> sliderFn({type:"SAVE"})
  let CANCEL = ()=> sliderFn({type:"EDIT"})

  return(
    <div className="SliderEdit">

      <div className="flex end">

        <span className="SliderEditInfo txtOrg">
          {`pictures size: 1200 x 500`}
        </span>

        <img className="imgBtn" src={btnSave} onClick={ ()=> SAVE() } alt="save" />

        <img className="imgBtn" src={btnCancel} onClick={ ()=> CANCEL() } alt="cancel" />

      </div>

      {
        slider.map( (folder, n)=>{
          return(
            <div className="flex wrap" key={`SliderLine${n}`}>

              {
                folder.txt.map( (text, k)=>{
                  let key = `SliderEditFolderTxt${k}`
                  return <Input props={{legend:text.name, val:text.val, n, sliderFn}} key={key} />
                })
              }

              {
                folder.imgs.map( (img, i)=>{
                  let key = `SliderEditFolderImgs${i}`
                  return <SliderEditImg props={{img, n, i, sliderFn}} key={key} />
                })
              }

            </div>
          )
        })
      }
    </div>
  )
}