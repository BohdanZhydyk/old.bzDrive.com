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
    
    //NEW INVOICE
    InData.object.newInvoice &&
    client.db(dbName)
      .collection(`baseSP`)
      .find({user:InData.object.newInvoice}).sort({_id:-1})
      .toArray( (error, result)=>{
        error && callback( Err(InData, error) )
        callback( Out(InData, result) )
    })

    //SAVE INVOICE
    InData.object.saveInvoice &&
    client.db(dbName)
      .collection('baseFS')
      .findOne( { _id: new ObjectID(InData.object.saveInvoice._id)}, (error, result)=>{
    
        error && callback( Err(InData, error) )

        if(result){
          client.db(dbName)
            .collection('baseFS').updateOne(
              {_id: new ObjectID(InData.object.saveInvoice._id)},
              {
                $set:{
                  status:"edited",
                  date:InData.object.saveInvoice.date,
                  invoiceNr:InData.object.saveInvoice.invoiceNr,
                  place:InData.object.saveInvoice.place,
                  dealer:InData.object.saveInvoice.dealer,
                  buyer:InData.object.saveInvoice.buyer,
                  articles:InData.object.saveInvoice.articles,
                  comments:InData.object.saveInvoice.comments,
                  netto:InData.object.saveInvoice.netto,
                  priceVAT:InData.object.saveInvoice.priceVAT,
                  brutto:InData.object.saveInvoice.brutto,
                  pay:InData.object.saveInvoice.pay
                }
              },
              {upsert:true}, (error, result)=>{
                error && callback( Err(InData, error) )
                callback( Out(InData, result) )
          })
        }
        else{
          client.db(dbName)
            .collection(`baseFS`)
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
              InData.object.saveInvoice.status = "saved"
              InData.object.saveInvoice.invoiceNr = InData.object.saveInvoice.invoiceNr + toSix(nr)

              client.db(dbName)
                .collection(`baseFS`)
                .insertOne(InData.object.saveInvoice, (error, result)=>{
                  error && callback( Err(InData, error) )
                  callback( Out(InData, result) )
              })
          }
        )}

    })

    //DELETE INVOICE
    InData.object.deleteInvoice &&
    client.db(dbName)
      .collection('baseFS')
      .updateOne(
        {_id: new ObjectID(InData.object.deleteInvoice._id)},
        { $set:{status:"deleted"} },
        {upsert:true}, (error, result)=>{
          error && callback( Err(InData, error) )
          callback( Out(InData, result) )
    })

  })
  
}