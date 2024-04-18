const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require('./routes/index');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(cookieParser());

app.use('/',indexRouter)



const server = http.createServer(app);

const port = 3000;


server.listen(port,()=>{
    console.log(`Server ${port} de çalıştı`)
})