import React, { useState } from 'react'

import { Input } from '../../../All/Input'


export const FinElEdit = ({ props:{fin, el, i, ok, finFn} })=>{

  let edit = el.edit

  const inputs = [
    {form:`MONTH`,  type:"text", val:el.date.month, error:true, legend:"Miesiąc"                  },
    {form:`YEAR`,   type:"text", val:el.date.year,  error:true, legend:"Rok"                      },
    {form:`ZUS`,    type:"text", val:el.ZUS,        error:true, legend:"Składka ZUS"              },
    {form:`IN`,     type:"text", val:el.in,         error:true, legend:"Razem przychod netto (9)" },
    {form:`ART`,    type:"text", val:el.art,        error:true, legend:"Zakup towarow netto (10)" },
    {form:`OUT`,    type:"text", val:el.out,        error:true, legend:"Razem wydatki netto (14)" }
  ]

  let Fn = (action)=> finFn({type:action.type, nr:i, value:action.value})

  let SAVE = ()=> finFn({type:"SAVE_FIN", fin})

  return(
    <div className="FinElEdit flex stretch">

      <div className="FinElEditL flex column">

      {
        edit &&
        <div className="FinElEditInputs flex wrap">

          <div className="DataInputs flex wrap">

          {
            inputs.map( (input, k)=>{
              return(
                k <= 1 ? <Input props={{input, print:false, Fn}} key={`${input.form}${i}${k}`} /> : <></>
              )
            })
          }
          </div>
  
          {
            inputs.map( (input, k)=>{
              return(
                k > 1 ? <Input props={{input, print:false, Fn}} key={`${input.form}${i}${k}`} /> : <></>
              )
            })
          }

        </div>
      }

      </div>

      <div className="FinElEditR">

        <div className="ElEditBtns flex end">
        {
          edit
          ?
          ok &&
          <>
            <img
              className="imgBtn"
              src="https://bzdrive.com/files/ico/icoSave.png"
              alt="save"
              title="Zachować"
              onClick = { ()=> SAVE() }
            />
            <img
              className="imgBtn"
              src="https://bzdrive.com/files/ico/icoCancel.png"
              alt="cancel"
              title="Zamknąć"
              onClick = { ()=> finFn({type:"CANCEL_FIN", nr:i}) }
            />
          </>
          :
          ok &&
          <img
            className="imgBtn"
            src="https://bzdrive.com/files/ico/icoEdit.png"
            alt="edit"
            title="Zedytować"
            onClick = { ()=> finFn({type:"EDIT_FIN", nr:i}) }
          />
        }
        </div>

        {
          edit &&
          <div className="ElEditInfo bold">
            <p className="txtYlw">
              Wypełnij formularz wykorzystowując informacje wziętą z Podatkowej Księgi Przychodów i rozchodów:
            </p>
            <p><span className="txtOrg">Miesiąc, Rok</span> - Bieżący miesiąc i rok</p>
            <p><span className="txtOrg">Składka ZUS</span> - Kwota składki ZUS za bieżący miesiąc</p>
            <p><span className="txtOrg">Razem przychod netto (9)</span> - Razem przychód netto (kolumna 9)</p>
            <p><span className="txtOrg">Zakup towarow netto (10)</span> - Zakup towarów netto (kolumna 10)</p>
            <p><span className="txtOrg">Razem wydatki netto (14)</span> - Razem wydatki netto (kolumna 14)</p>
          </div>
        }

      </div>

    </div>
  )
}