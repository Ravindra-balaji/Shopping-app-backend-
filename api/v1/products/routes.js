const express=require("express");
const { updateProductController,createproductController, getAllProducts } = require("./controller");
const prodrouter=express.Router();

prodrouter.get("/",getAllProducts);
prodrouter.post("/",createproductController);
prodrouter.patch("/:productId",updateProductController);

module.exports={prodrouter};
