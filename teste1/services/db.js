const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'to-do-db';
const client = new MongoClient(url, {useUnifiedTopology: true});

var _db;
function connectToDB(callback){

    client.connect(function (err){
       
        console.log('Connected successfully to server');
    
        _db = client.db(dbName);
        
        callback(err)
    });

}

const findDocuments = async () =>{
    const collection = _db.collection('to-do-collection');
    try{
    const results = await collection.find({}).toArray();
    return results
    }catch (error){
        throw new Error(error)
    }
};

const insertDocument = async(document) =>{

    const collection =  _db.collection('to-do-collection');
    try{
        const results = await collection.insertOne(document);
        return results
    }catch (error){
        throw new Error(error)
    }
};

const updatedeDocumento = async (document) => {

    const collection =  _db.collection('to-do-collection');

    try{

        const results = await collection.updateOne({ _id: document._id}, {$set: document});
        return results

    }catch (error){
        throw new Error(error)
    }
};

const deletarDocumento = async (document) =>{

    const collection =  _db.collection('to-do-collection');

    try{

        const results = await collection.deleteOne({ _id: document._id}, {$set: document});
        return results

    }catch (error){
        throw new Error(error)
    }
};

module.exports = {
    connectToDB,
    insertDocument,
    findDocuments,
    updatedeDocumento,
    deletarDocumento
}