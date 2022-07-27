const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { bzDB } = require('./../bzDB')
const {getRandomColor} = require('./../functions')


exports.getOffice = (req, res)=>{
  
  let object = req.body.object

  // //GET MODE
  object.getMode &&
  bzDB( { req, res, collection:`base${object.getMode}`, act:"FIND", query:object.query }, (data)=>{
    
    res.send({
      ...data,
      object:{
        ...data.object,
        result:data.object.result
      }
    })

  })

  // //GET CLIENT
  object.getClient &&
  bzDB( { req, res, collection:`baseKL`, act:"FIND", query:object.getClient }, (data)=>{

    res.send({
      ...data,
      object:{
        ...data.object,
        result:data.object.result
      }
    })

  })
    
  // //NEW
  object.new &&
  bzDB( { req, res, collection:`baseSP`, act:"FIND", query:{user:object.new} }, (data)=>{

    res.send({
      ...data,
      object:{
        ...data.object,
        result:data.object.result
      }
    })

  })

  //SAVE
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
            nr: object.save.nr,
            place: object.save.place,
            date: DayParse(object.save.date),
            dealer: object.save.dealer,
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
            nr: object.save.nr,
            place: object.save.place,
            date: DayParse(object.save.date),
            dateTo: DayParse(object.save.dateTo),
            dealer: object.save.dealer,
            car: { ...object.save.car, color: getRandomColor() },
            buyer: object.save.buyer,
            articles: object.save.articles,
            netto: object.save.netto,
            priceVAT: object.save.priceVAT,
            brutto: object.save.brutto
          }
        case "KL": return {
          status: "saved",
          client: object.save.client
        }
        default: break
      }
    }

    switch(save().status){
      case "client":
        bzDB( { req, res, collection:`base${mode}`, act:"INSERT_ONE", query:save() }, (data)=>{

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
          "dealer.user": save().dealer.user,
          "nr.letter": save().nr.letter,
          "nr.year": save().nr.year,
          "nr.month": save().nr.month
        }
        bzDB( { req, res, collection:`base${mode}`, act:"FIND", query }, (data)=>{

          let Result = data.object.result[0]

          Result
          ? save().nr.sign = ( parseInt(Result.nr.sign) + 1 ).toString()
          : save().nr.sign = ( 1 ).toString()

          bzDB( { req, res, collection:`base${mode}`, act:"INSERT_ONE", query:save() }, (InsertData)=>{
          
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
        bzDB( { req, res, collection:`base${mode}`, act:"UPDATE_ONE", query }, (data)=>{

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