const express=require("express");
const { prodrouter } = require("./products/routes");
const router=express.Router();

router.use("/products",prodrouter);
// router.get("/hello/user",(req,res)=>
// {
//     res.json(
//         {
//             isSuccess:true,
//             message:"Hello from user"
//         }
//     )
// });
module.exports={router};