const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')
const {getRandomColor} = require('./../functions')


exports.getOffice = (req, res)=>{
  
  let object = req.body.object

  bzDB( { req, res, col:`bzUsers`, act:"FIND", query:{} }, (data)=>{

    let returnDealer = (login)=>{
      let dealers = data.object.result
      for(let i=0; i<dealers.length; i++){
        if(dealers[i].login === login){ return dealers[i].dealer }
      }
    }

    // GET MODE
    object.getMode &&
    bzDB( { req, res, col:`base${object.getMode}`, act:"FIND", query:object.query }, (data)=>{
      const result = data.object.result.map( el=>{
        return { ...el, dealer:returnDealer(el.user) }
      })
      res.send({ ...data, object:{...data.object, result} })
    })
    
    // GET DOCUMENT
    object.getDoc &&
    bzDB( { req, res, col:`base${object.getDoc}`, act:"FIND_ONE", query:{_id:new ObjectID(object.id)} }, (data)=>{
      const result = { ...data.object.result, dealer:returnDealer(data.object.result.user) }
      res.send({ ...data, object:{...data.object, result} })
    })

  })

  // GET CLIENT
  object.getClient &&
  bzDB( { req, res, col:`baseFS`, act:"FIND", lim:1, query:object.getClient }, (data)=>{
    const result = data?.object?.result[0] ? data.object.result[0].buyer : false
    res.send({ ...data, object:{...data.object, result} })
  })

  // GET CAR
  object.getCar &&
  bzDB( { req, res, col:`baseZL`, act:"FIND", lim:1, query:object.getCar }, (data)=>{

    let Res = data?.object?.result[0]

    const result = Res
      ? {
        brand: Res.car.brand,
        model: Res.car.model,
        prod: Res.car.prod,
        numbers: Res.car.numbers,
        engine: Res.car.engine
      }
      : false

    res.send({ ...data, object:{...data.object, result} })

  })
    
  // NEW
  object.new &&
  bzDB( { req, res, col:`baseSP`, act:"FIND", query:{user:object.new} }, (data)=>{
    const result = data.object.result
    res.send({ ...data, object:{...data.object, result} })
  })

  // GET DEALER
  object.getDealer &&
  bzDB( { req, res, col:`baseSP`, act:"FIND_ONE", query:{user:object.user} }, (data)=>{
    const result = data.object.result
    res.send({ ...data, object:{...data.object, result} })
  })

  // ADD_FILE
  object.addFile &&
  bzDB( { req, res, col:`baseZL`, act:"FIND_ONE", query:{_id:new ObjectID(object.id)} }, (data)=>{

    let file = {fileID:Date.now(), ...object.file}

    let save = {
      ...data.object.result,
      files: data.object.result?.files ? [...data.object.result.files, file] : [file]
    }

    let query = {...save, _id:new ObjectID(object.id)}

    bzDB( { req, res, col:`baseZL`, act:"UPDATE_ONE", query }, (data)=>{

      bzDB( { req, res, col:`baseZL`, act:"FIND_ONE", query:{_id:new ObjectID(object.id)} }, (data)=>{
        const result = data.object.result
        res.send({ ...data, object:{...data.object, result} })
      })

    })

  })

  // SAVE
  object.save &&
  SaveDoc()
  function SaveDoc(){
    
    let mode = object.mode

    let save = ()=>{
      switch(mode){
        case "FS":
          return {
            user: object.save.user,
            status: object.save.status,
            nr: object.save.nr,
            buyer: object.save.buyer,
            articles: object.save.articles,
            comments: object.save.comments
          }
        case "ZL":
          return {
            user: object.save.user,
            status: object.save.status,
            nr: object.save.nr,
            buyer: object.save.buyer,
            articles: object.save.articles,
            car: object.save.car
          }
        case "KL": return {
          user: object.save.user,
          status: "saved",
          client: object.save.client
        }
        default: break
      }
    }

    switch(save().status){
      case "client":
        bzDB( { req, res, col:`base${mode}`, act:"INSERT_ONE", query:save() }, (data)=>{
          const result = data.object.result
          res.send({ ...data, object:{...data.object, result} })
        })
        break
      case "saved":

        object.save.status = "edited"
        query = {"nr.from":{ $gte:parseInt(`${parseInt(save().nr.from / 100)}00` ) }}

        bzDB( { req, res, col:`base${mode}`, act:"FIND", lim:1, query }, (FindData)=>{

          let Result = FindData.object.result[0]

          save().nr.sign = Result ? ( parseInt(Result.nr.sign) + 1 ) : 1

          bzDB( { req, res, col:`base${mode}`, act:"INSERT_ONE", query:save() }, (data)=>{
            const result = data.object.result
            res.send({ ...data, object:{...data.object, result} })
          })

        })
        break
      default:
        let _id = new ObjectID(object.save.id)
        bzDB( { req, res, col:`base${mode}`, act:"UPDATE_ONE", query:{...save(), _id} }, (data)=>{
          const result = data.object.result
          res.send({ ...data, object:{...data.object, result} })
        })
        break
    }

  }
  
}