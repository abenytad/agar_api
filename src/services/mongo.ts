export {};
const mongoose=require('mongoose');
const MONGO_URL=process.env.DATABASE_URL;
async function startConnection(){
    mongoose.connection.once('open',()=>{
        console.log('the database is connected');
    });
    mongoose.connection.on('error',(err:any)=>{
        console.log(err,"error")
    });
   await mongoose.connect(MONGO_URL,{
        // useNewUrlParser:true,
        // useUnfiedTopology:true,
    })
}
module.exports=startConnection;