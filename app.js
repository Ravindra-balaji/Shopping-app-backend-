const dotEnv=require("dotenv");
dotEnv.config();
require("./config/db.js");
const cors=require("cors");
const express=require("express");
const{router}=require("./api/v1/routes.js")
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/v1",router);
app.listen(2000,()=>
{
    console.log("-----Server is running-----");
})