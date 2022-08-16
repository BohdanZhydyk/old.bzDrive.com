const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')
const { enCrypt, deCrypt } = require('./../safe/safe')


exports.getPass = (req, res)=>{
  
  let object = req.body.object
  // console.log(object)

  // GET ALL
  object.getAll &&
  bzDB( { req, res, collection:`bzPass`, act:"FIND", query:object.query, sort:object.sort }, (data)=>{
    
    res.send({
      ...data,
      object:{
        ...data.object,
        result: data.object.result.map( el =>{
          return {
            ...el,
            siteData: el.siteData.map( subEl=>{
              return {...subEl, pass: subEl?.pass ? false : ""}
            })
          }
        })
      }
    })

  })

  // GET ONE
  object.getOne &&
  bzDB( { req, res, collection:`bzPass`, act:"FIND_ONE", query:{_id: new ObjectID(object.query._id)} }, (data)=>{

    let pass = data?.object?.result?.siteData[object.query.nr]?.pass
      ? deCrypt(data.object.result.siteData[object.query.nr].pass)
      : false

    res.send({
      ...data,
      object:{
        ...data.object,
        result: pass
      }
    })

  })

  // SAVE
  object.save &&
  bzDB( { req, res, collection:`bzPass`, act:"FIND_ONE", query:{_id: new ObjectID(object.query._id)} }, (data)=>{

    let _id = new ObjectID(object.query._id)
    let dataPass = (i)=>{
      return (data?.object?.result?.siteData[i]?.pass) ? data.object.result.siteData[i].pass : false
    }

    let save = {
      user: object.user,
      siteName: object.query.siteName,
      link: object.query.link,
      info: object.query.info,
      siteData: object.query.siteData.map( (subEl, i)=>{
        return {
          userName: subEl.userName,
          login: subEl.login,
          pass: subEl?.pass ? enCrypt(subEl.pass) : dataPass(i)
        }
      })
    }

    data.object.result
    ?
    bzDB( { req, res, collection:`bzPass`, act:"UPDATE_ONE", query:{...save, _id} }, (data)=>{
      res.send({
        ...data,
        object:{
          ...data.object,
          result: save
        }
      })
    })
    :
    bzDB( { req, res, collection:`bzPass`, act:"INSERT_ONE", query:save }, (data)=>{
      res.send({
        ...data,
        object:{
          ...data.object,
          result: save
        }
      })
    })

  })

  // DELETE
  object.delete &&
  bzDB( { req, res, collection:`bzPass`, act:"DELETE_ONE", query:{_id: new ObjectID(object.query)} }, (data)=>{
    
    res.send({
      ...data,
      object:{
        ...data.object,
        result: object.query
      }
    })

  })
  
}