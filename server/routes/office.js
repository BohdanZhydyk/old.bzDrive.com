const mongo = require('mongodb')
const mongoClient = mongo.MongoClient
const ObjectID = mongo.ObjectID

const { url, dbName } = require('./../safe/safe')


exports.office = (req, res, InData, callback)=>{

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
    
    if(error){ InData.Errors.push( error ); callback(InData); return; }

    // GET STATE
    InData.object.getState &&
    mongoClient.connect(url, { useUnifiedTopology: true }, (error, client)=>{
  
      if(error){ InData.Errors.push( error ); callback(InData); return; }
  
      client.db(dbName)
        .collection('state')
        .findOne( { _id: new ObjectID('60c6294fec2924b23c00834d')}, (error, result)=>{
  
        if(error){ InData.Errors.push( error ); callback(InData); return; }
  
        callback({
          Errors: InData.Errors,
          link: InData.link,
          bzToken: InData.bzToken,
          user: InData.user,
          IP: InData.IP,
          serverData: result
        })
  
      })
  
    })

    //GET MODE
    InData.object.getMode &&
    client.db(dbName).collection(`base${InData.object.getMode}`).find({}).sort({_id:-1}).toArray( (error, result)=>{

      if(error){ InData.Errors.push( error ); callback(InData); return; }

      callback({
        Errors: InData.Errors,
        link: InData.link,
        bzToken: InData.bzToken,
        user: InData.user,
        IP: InData.IP,
        serverData: result
      })

    })
    
    //NEW INVOICE
    InData.object.newInvoice &&
    client.db(dbName).collection(`baseSP`).find({user:InData.object.newInvoice}).sort({_id:-1}).toArray( (error, result)=>{
      
      if(error){ InData.Errors.push( error ); callback(InData); return; }

      callback({
        Errors: InData.Errors,
        link: InData.link,
        bzToken: InData.bzToken,
        user: InData.user,
        IP: InData.IP,
        serverData: result
      })

    })

    //SAVE INVOICE
    InData.object.saveInvoice &&
    client.db(dbName).collection('baseFA').findOne( { _id: new ObjectID(InData.object.saveInvoice._id)}, (error, result)=>{
    
      if(result){

        client.db(dbName).collection('baseFA').updateOne(
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
              brutto:InData.object.saveInvoice.brutto
            }
          },
          {upsert:true}, (error, response)=>{
          
            if(error){ InData.Errors.push( error ); callback(InData); return; }
            
            callback({
              Errors: InData.Errors,
              link: InData.link,
              bzToken: InData.bzToken,
              user: InData.user,
              IP: InData.IP,
              serverData: response
            })
    
        })

      }
      else{

        client.db(dbName).collection(`baseFA`).find({}).sort({_id:-1}).toArray( (error, result)=>{

          if(error){ InData.Errors.push( error ); callback(InData); return; }

          let nr = ''
          for(let i=10; i<result[0].invoiceNr.length; i++){
            nr = nr + result[0].invoiceNr[i]
          }
          let toSix = (dig)=>{
            dig = ( parseFloat(dig)+1 ).toString()
            while(dig.length < 6){ dig = "0" + dig }
            return (dig)
          }
          InData.object.saveInvoice.status = "saved"
          InData.object.saveInvoice.invoiceNr = InData.object.saveInvoice.invoiceNr + toSix(nr)

          client.db(dbName).collection(`baseFA`).insertOne(InData.object.saveInvoice, (error, response)=>{
  
            if(error){ InData.Errors.push( error ); callback(InData); return; }
            
            callback({
              Errors: InData.Errors,
              link: InData.link,
              bzToken: InData.bzToken,
              user: InData.user,
              IP: InData.IP,
              serverData: response
            })
            
          })

        }

      )}

    })

    //DELETE INVOICE
    InData.object.deleteInvoice &&
    client.db(dbName).collection('baseFA').updateOne(
      {_id: new ObjectID(InData.object.deleteInvoice)},
      { $set:{status:"deleted"} }, {upsert:true}, (error, response)=>{
      
        if(error){ InData.Errors.push( error ); callback(InData); return; }
        
        callback({
          Errors: InData.Errors,
          link: InData.link,
          bzToken: InData.bzToken,
          user: InData.user,
          IP: InData.IP,
          serverData: response
        })

    })

  })
  
}