
exports.Err = (data, err)=>{
  data.Errors.push( err )
  return data
}

exports.Out = (data, res)=>{
  return {
    Errors: data.Errors,
    link: data.link,
    bzToken: data.bzToken,
    user: data.user,
    IP: data.IP,
    serverData: res
  }
}