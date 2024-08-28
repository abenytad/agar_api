const http=require('http');
const app=require('./app');

const PORT=process.env.PORT || 8000;
const server=http.createServer(app);
const startConnectionn=require('./services/mongo')
async function startServer(){
    await startConnectionn();
    server.listen(PORT,()=>{
        console.log(`the server is running on ${PORT}`);
    })
}

startServer();