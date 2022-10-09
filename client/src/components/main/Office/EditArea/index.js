import React, { useState, useEffect } from "react"
import cookies from 'js-cookie'
import "./EditArea.scss"

import { emptyArt, Logic } from "./actions"
import { bzGetUser, getRandomColor } from "../../../../state/functions"
import { ElStatus } from "./Components/ElStatus"
import { EditAreaBtns } from "./Components/EditAreaBtns"
import { ElHead } from "./Components/ElHead"
import { ElInfo } from "./Components/ElInfo"
import { ElFaults } from "./Components/ElFaults"
import { ElArticles } from "./Components/ElArticles"
import { ElFiles } from "./Components/ElFiles"
import { ElComment } from "./Components/ElComment"
import { ElAmount } from "./Components/ElAmount"
import { ElSignatures } from "./Components/ElSignatures"


const EditArea = ({ props:{mode, line, CANCEL, PRINTFUNC, ReloadFn, officeFn} })=>{

  const id = line?._id ? line._id : false
  const author = line.user
  const sign = [{txt:"Osoba upoważniona do wystawienia"}, {txt:"Osoba upoważniona do odbioru"}]
  let print = PRINTFUNC ? PRINTFUNC.print : false
  let DO = ()=> PRINTFUNC.DO()

  const [noPrint, setNoPrint] = useState( false )

  const [status, setStatus] = useState( line?.status )
  const [user, setUser] = useState( line?.user ? line.user : bzGetUser().login )
  const [nr, setNr] = useState( line?.nr ? line.nr : false )
  const [dealer, setDealer] = useState( line?.dealer ? line.dealer : false )
  const [buyer, setBuyer] = useState( line?.buyer ? line.buyer : false)
  const [car, setCar] = useState( line?.car ? line.car : {color:getRandomColor()} )
  const [client, setClient] = useState( line?.client ? line.client : false)
  const [articles, setArticles] = useState( line?.articles ? line.articles : [emptyArt] )
  const [files, setFiles] = useState( line?.files ? line.files : [] )
  const [comments, setComments] = useState( line?.comments ? line.comments : '' )

  let AreaFn = (action)=> Logic(
    action, id, mode, cookies, user, setNoPrint, status, setStatus, nr, setNr,
    buyer, setBuyer, car, setCar, client, setClient, articles, setArticles,
    files, setFiles, comments, setComments, dealer, setDealer, ReloadFn, officeFn
  )
  
  useEffect( ()=>{ !dealer && AreaFn({type:"EFFECT"}) },[])

  return(
    <>
    {
      dealer &&
      <div className="EditArea flex column start">

        <ElStatus props={{mode, status, user, car, print, AreaFn}}/>

        <EditAreaBtns props={{mode, status, author, id, AreaFn, CANCEL, print, noPrint, DO}}/>

        {
          (mode === "FS" || mode === "ZL") &&
          <ElHead props={{mode, dealer, nr, print, AreaFn}} />
        }

        {
          (mode === "FS" || mode === "ZL" || mode === "KL") &&
          <ElInfo props={{mode, car, client, dealer, buyer, print, AreaFn}} />
        }

        {
          mode === "ZL" &&
          <ElFaults props={{car, print, AreaFn}} />
        }

        {
          (mode === "FS" || mode === "ZL") &&
          <ElArticles props={{mode, articles, print, AreaFn}} />
        }

        {
          (mode === "ZL" && nr?.sign) &&
          <ElFiles props={{nr, files, print, AreaFn}} />
        }

        {
          mode === "FS" &&
          <ElComment props={{comments, print, AreaFn}} />
        }
        
        {
          (mode === "FS") &&
          <ElAmount props={{mode, nr, articles, print, AreaFn}} />
        }

        {
          (mode === "FS" || mode === "ZL") &&
          <ElSignatures props={{sign}} />
        }

        <EditAreaBtns props={{mode, status, author, id, AreaFn, CANCEL, print, noPrint, DO}}/>

      </div>
    }
    </>
  )
}

export default EditArea