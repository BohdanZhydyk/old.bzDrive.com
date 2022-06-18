
export const LineBtns = ({ props:{el, n, elFunc} })=>{

  let N = (n === 0)
  let PlusMinus = el.open ? `Minus` : `Plus`
  let PlusMinusTitle = el.open ? `zwinąć` : `rozwinąć`
  let More = `More`
  let PlusMinusImg = `https://files.bzdrive.com/img/ico/ico${PlusMinus}.png`
  let MoreImg = `https://files.bzdrive.com/img/ico/icoMore.png`

  return(
    <div className="flex">

      <span className="flex" onClick={ ()=> elFunc(N ? PlusMinus : More) }>
        <img
          className="imgBtn flex"
          src={N ? PlusMinusImg : MoreImg}
          title={N ? PlusMinusTitle : `więcej`}
          alt={N ? PlusMinus : More}
        />
      </span>

    </div>
  )
}