import React, { useState, useEffect } from 'react'

import { ScreenSaver } from '../../All/ScreenSaver'
import { ProfileSection } from './ProfileSection'


export const Users = ({ props:{profile, ProFn} })=>{

  let TopLine = {
    _id:"Nr",
    role:"Role",
    login:"Login",
    email:"e-mail",
    lang:"Lang",
    sex:"Sex",
    ava:"Ava"
  }

  const [users, setUsers] = useState(false)

  let filtered = (arr)=> arr.filter( el=> el.login !== profile.login )

  useEffect( ()=>{ !users && ProFn({ type:"GET_USERS", cb:(data)=>setUsers(filtered(data)) }) },[])

  let OPEN_CLOSE = (i, act)=>{
    setUsers(
      users.map( (user, n)=> n === i ? {...user, act} : {...user, act:false} )
    )
  }

  let title = `Wszyscy użytkownicy ${users ? `[ ${users.length} ]` : ``}`

  return(
    <div className="ProfileSection flex column">

      <div className="ProfileTitle bold flex">{title}</div>

      {
        !users
        ? <ScreenSaver />
        :
        <>
        {
          [TopLine, ...users].map( (user, i)=>{

            let classes = `UserLine ${i === 0 ? `txtOrg bold TopLine` : ``} flex`
            let key = `UserLine${user._id}${i}`

            let OC = ()=> OPEN_CLOSE(i - 1, !user?.act)

            let table = [
              {cl:"Nr", val:(i === 0 ? user._id : i)},
              {cl:"Role", val:user.role},
              {cl:"Login", val:user.login},
              {cl:"Email", val:user.email},
              {cl:"Lang", val:user.lang},
              {cl:"Sex", val:user.sex},
              {cl:"Ava", val:user.ava}
            ]

            return(
              <>
                <div className={classes} key={key}>
                  {
                    table.map( (line, n)=>{
                      let key = `UserLineElement${i}${n}`
                      let cl = `${line.cl} nowrapTxt flex start`
                      return(
                        <span className={cl} onClick={ OC } key={key}>{line.val}</span>
                      )
                    })
                  }
                </div>

                { i !== 0 && user.act && <ProfileSection props={{profile:user, ProFn}} /> }
              </>
            )
          })
        }
        </>
      }

    </div>
  )
}