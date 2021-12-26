const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')
const { Err, Out } = require('./../InOut/Out')


exports.office = (req, res, InData, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    
    error && callback( Err(InData, error) )

    // GET STATE
    InData.object.getState &&  
    client.db(dbName)
      .collection('state')
      .findOne( { _id: new ObjectID('60c6294fec2924b23c00834d')}, (error, result)=>{
        error && callback( Err(InData, error) )
        callback( Out(InData, result) )
    })

    //GET MODE
    InData.object.getMode &&
    client.db(dbName)
      .collection(`base${InData.object.getMode}`)
      .find({}).sort({_id:-1})
      .toArray( (error, result)=>{
        error && callback( Err(InData, error) )
        callback( Out(InData, result) )
    })
    
    //NEW
    InData.object.new &&
    client.db(dbName)
      .collection(`baseSP`)
      .find({user:InData.object.new}).sort({_id:-1})
      .toArray( (error, result)=>{
        error && callback( Err(InData, error) )
        callback( Out(InData, result) )
    })

    //SAVE
    if(InData.object.save){

      let id = InData.object.save.id
      let mode = InData.object.mode

      let save = ()=>{
        switch(mode){
          case "FS":
            return {
              status:InData.object.save.status,
              nr:InData.object.save.nr,
              place:InData.object.save.place,
              date:InData.object.save.date,
              dealer:InData.object.save.dealer,
              buyer:InData.object.save.buyer,
              articles:InData.object.save.articles,
              comments:InData.object.save.comments,
              netto:InData.object.save.netto,
              priceVAT:InData.object.save.priceVAT,
              brutto:InData.object.save.brutto,
              pay:InData.object.save.pay
            }
          case "ZL":
            return {
              status:InData.object.save.status,
              nr:InData.object.save.nr,
              place:InData.object.save.place,
              date:InData.object.save.date,
              dealer:InData.object.save.dealer,
              car:InData.object.save.car,
              buyer:InData.object.save.buyer,
              articles:InData.object.save.articles,
              netto:InData.object.save.netto,
              priceVAT:InData.object.save.priceVAT,
              brutto:InData.object.save.brutto
            }
          default: break
        }
      }

      switch(save().status){
        case "saved":
          client.db(dbName)
            .collection(`base${mode}`)
            .find({
              "nr.letter": save().nr.letter,
              "nr.year": save().nr.year,
              "nr.month": save().nr.month
            })
            .sort({_id:-1})
            .toArray( (error, result)=>{

              error && callback( Err(InData, error) )

              result[0]
              ? save().nr.sign = ( parseInt(result[0].nr.sign) + 1 ).toString()
              : save().nr.sign = ( 1 ).toString()              

              client.db(dbName)
                .collection(`base${InData.object.mode}`)
                .insertOne(save(), (error, result)=>{
                  error && callback( Err(InData, error) )
                  callback( Out(InData, result) )
              })
          })
          break
        default:
          client.db(dbName)
            .collection(`base${mode}`)
            .updateOne(
              {_id: new ObjectID(id)},
              {$set: {...save(), status:save().status} },
              {upsert:true}, (error, result)=>{
                error && callback( Err(InData, error) )
                callback( Out(InData, result) )
          })
          break
      }

    }

  })
  
}