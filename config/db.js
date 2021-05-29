const mongoose = require('mongoose');
const colors = require('colors');
const config = require('config');
const db = config.get('mongoURI');


const connectDB = async () => {
 try {
          const conn = await  mongoose.connect(db , {
            useFindAndModify : false ,
            useNewUrlParser : true ,
            useCreateIndex : true ,
            useUnifiedTopology: true ,
           
   } )
   console.log(`MongoDb Connected: ${conn.connection.host}....`.cyan.underline.bold)
 } catch (error) {
     console.error(`Error : ${error.message}`.red.underline.bold);
     process.exit(1);
 }
}

module.exports = connectDB;