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

      let save = {
        status:"edited",
        place:InData.object.save.place,
        date:InData.object.save.date,
        dealer:InData.object.save.dealer,
        buyer:InData.object.save.buyer,
        invoiceNr:InData.object.save.invoiceNr,
        articles:InData.object.save.articles,
        comments:InData.object.save.comments,
        netto:InData.object.save.netto,
        priceVAT:InData.object.save.priceVAT,
        brutto:InData.object.save.brutto,
        pay:InData.object.save.pay
      }

      InData.object.save._id === "new"
      ?
      client.db(dbName)
        .collection(`base${InData.object.mode}`)
        .find({}).sort({_id:-1})
        .toArray( (error, result)=>{

          error && callback( Err(InData, error) )

          let RES = result[0] ? result[0] : {invoiceNr:`-/----/--/000000`}
          let nr = ''
          for(let i=10; i<RES.invoiceNr.length; i++){
            nr = nr + RES.invoiceNr[i]
          }
          let toSix = (dig)=>{
            dig = ( parseFloat(dig)+1 ).toString()
            while(dig.length < 6){ dig = "0" + dig }
            return (dig)
          }

          save.status = "saved"
          save.invoiceNr = InData.object.save.invoiceNr + toSix(nr)

          client.db(dbName)
            .collection(`base${InData.object.mode}`)
            .insertOne(save, (error, result)=>{
              error && callback( Err(InData, error) )
              callback( Out(InData, result) )
          })
      })
      :
      client.db(dbName)
        .collection(`base${InData.object.mode}`).updateOne(
          {_id: new ObjectID(InData.object.save._id)},
          {$set:save},
          {upsert:true}, (error, result)=>{
            error && callback( Err(InData, error) )
            callback( Out(InData, result) )
      })
    }

    //DELETE
    InData.object.delete &&
    client.db(dbName)
      .collection(`base${InData.object.mode}`)
      .updateOne(
        {_id: new ObjectID(InData.object.delete._id)},
        { $set:{status:"deleted"} },
        {upsert:true}, (error, result)=>{
          error && callback( Err(InData, error) )
          callback( Out(InData, result) )
    })

  })
  
}