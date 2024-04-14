const express = require("express");
const http = require("http");
const app = express();

const hello = require('./controller/index');

app.use('/',hello)



const server = http.createServer(app);

const port = 3000;


server.listen(port,()=>{
    console.log(`Server ${port} de çalıştı`)
})