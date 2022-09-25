const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')
const {getRandomColor} = require('./../functions')


exports.getOffice = (req, res)=>{
  
  let object = req.body.object

  bzDB( { req, res, col:`bzUsers`, act:"FIND", query:{} }, (data)=>{

    let dealers = data.object.result

    let returnDealer = (login)=>{
      for(let i=0; i<dealers.length; i++){
        if(dealers[i].login === login){ return dealers[i].dealer }
      }
    }

    // GET MODE
    object.getMode &&
    bzDB( { req, res, col:`base${object.getMode}`, act:"FIND", query:object.query }, (data)=>{
      
      res.send({
        ...data,
        object:{
          ...data.object,
          result: data.object.result.map( el=>{
            return { ...el, dealer:returnDealer(el.user) }
          })
        }
      })

    })
    
    // GET DOCUMENT
    object.getDoc &&
    bzDB( { req, res, col:`base${object.getDoc}`, act:"FIND_ONE", query:{_id:new ObjectID(object.id)} }, (data)=>{
      
      let el = data.object.result
      res.send({
        ...data,
        object:{
          ...data.object,
          result: { ...el, dealer:returnDealer(el.user) }
        }
      })
      
    })

  })

  // GET CLIENT
  object.getClient &&
  bzDB( { req, res, col:`baseFS`, act:"FIND", lim:1, query:object.getClient }, (data)=>{

    let client = data?.object?.result[0] ? data.object.result[0].buyer : false

    res.send({ ...data, object:{...data.object, result:client} })

  })

  // GET CAR
  object.getCar &&
  bzDB( { req, res, col:`baseZL`, act:"FIND", lim:1, query:object.getCar }, (data)=>{

    let result = data?.object?.result[0]

    let car = result
      ? {
        brand: result.car.brand,
        model: result.car.model,
        prod: result.car.prod,
        numbers: result.car.numbers,
        engine: result.car.engine
      }
      : false

    res.send({ ...data, object:{...data.object, result:car} })

  })
    
  // NEW
  object.new &&
  bzDB( { req, res, col:`baseSP`, act:"FIND", query:{user:object.new} }, (data)=>{

    res.send({
      ...data,
      object:{
        ...data.object,
        result:data.object.result
      }
    })

  })

  // GET DEALER
  object.getDealer &&
  bzDB( { req, res, col:`baseSP`, act:"FIND_ONE", query:{user:object.user} }, (data)=>{

    res.send({
      ...data,
      object:{
        ...data.object,
        result:data.object.result
      }
    })

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

        res.send({
          ...data,
          object:{
            ...data.object,
            result:data.object.result
          }
        })

      })

    })

  })

  // SAVE
  if(object.save){
    
    let mode = object.mode
    let DayParse = (date)=>{
      return {
        year: parseInt(date.year),
        month: parseInt(date.month),
        day: parseInt(date.day),
        unix: Date.parse(`${date.year}-${date.month}-${date.day}`)
      }
    }

    let save = ()=>{
      switch(mode){
        case "FS":
          return {
            status: object.save.status,
            user: object.save.user,
            nr: object.save.nr,
            place: object.save.place,
            date: DayParse(object.save.date),
            buyer: object.save.buyer,
            articles: object.save.articles,
            comments: object.save.comments,
            netto: object.save.netto,
            priceVAT: object.save.priceVAT,
            brutto: object.save.brutto,
            pay: { ...object.save.pay, date: DayParse(object.save.pay.date) }
          }
        case "ZL":
          return {
            status: object.save.status,
            user: object.save.user,
            nr: object.save.nr,
            place: object.save.place,
            date: DayParse(object.save.date),
            dateTo: DayParse(object.save.dateTo),
            car: { ...object.save.car, color: getRandomColor() },
            buyer: object.save.buyer,
            articles: object.save.articles,
            netto: object.save.netto,
            priceVAT: object.save.priceVAT,
            brutto: object.save.brutto
          }
        case "KL": return {
          status: "saved",
          user: object.save.user,
          client: object.save.client
        }
        default: break
      }
    }

    switch(save().status){
      case "client":
        bzDB( { req, res, col:`base${mode}`, act:"INSERT_ONE", query:save() }, (data)=>{

          res.send({
            ...data,
            object:{
              ...data.object,
              result:data.object.result
            }
          })

        })
        break
      case "saved":
        object.save.status = "edited"
        query = {
          "nr.letter": save().nr.letter,
          "nr.year": save().nr.year,
          "nr.month": save().nr.month
        }
        bzDB( { req, res, col:`base${mode}`, act:"FIND", lim:1, query }, (data)=>{

          let Result = data.object.result[0]

          Result
          ? save().nr.sign = ( parseInt(Result.nr.sign) + 1 )
          : save().nr.sign = 1

          bzDB( { req, res, col:`base${mode}`, act:"INSERT_ONE", query:save() }, (InsertData)=>{
          
            res.send({
              ...InsertData,
              object:{
                ...InsertData.object,
                result:InsertData.object.result
              }
            })

          })

        })
        break
      default:
        let id = new ObjectID(object.save.id)
        query = {...save(), _id:id}
        bzDB( { req, res, col:`base${mode}`, act:"UPDATE_ONE", query }, (data)=>{

          res.send({
            ...data,
            object:{
              ...data.object,
              result:data.object.result
            }
          })

        })
        break
    }

  }
  
}