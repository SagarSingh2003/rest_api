const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        MONGODB_URI='mongodb+srv://iamsagar762:Sagar10%40singh@cluster0.1x5j95v.mongodb.net/?retryWrites=true&w=majority';

        mongoose.set('strictQuery', false);//we set this otherwise we get some errors that we don't want
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`Database Conencted: ${conn.connection.host}`)
    
    }catch (err){
        console.log(err);
    }
}
module.exports = {
    connectDB
}