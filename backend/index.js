const express = require('express');
const cors = require('cors');
const app = express();

const rootRouter = require('./routes/Router');

app.use(cors());
app.use(express.json());
app.use ( '/api/v1' , rootRouter );

app.get('/',(req,res)=>{
    res.send("Yo i'm Honey Singh")
});

PORT=3000;

app.listen(PORT,()=>{
    console.log("Server started at port : ",PORT)
});