
const Photo = ({ data:{img, text} })=>{
  return (
    <div className="photo boxShadow flex wrap" >

      <div className="text flex" >{text}</div>

      <img className="img" src={img} alt="ava" />

    </div>
  )
}

export default Photo