import React from 'react'


export const Logo = ({}) => {
  return(
    <div className="logo flex start bold">
      <img src="https://files.bzdrive.com/img/Drive/logo/logoDrive.gif" alt="bzDrive" />
      <span className="txtOrg">
        <span>bz</span>
        <span className="txtBlk">Drive</span>
        <span>.com</span>
      </span>
    </div>
  )
}