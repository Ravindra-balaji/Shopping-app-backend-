const { Product } = require("../../../models/product_schema");

const  createproductController=async (req,res)=>{
    try{

    const data=req.body;
    console.log("creating products...",data);
    Object.keys(data).forEach((key)=>
    {
        if(data[key]==undefined || data[key]=="")
        {
            delete data.key;
        }
    });
    // let newproduct=null;
    try{
newproduct=await Product.create(data);
    }
    catch(err)
    {
        if (err.name === "ValidationError" || err.code == "11000") {
            res.status(400).json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
        }
        console.log("🔴 Error while creating product");
        res.status(400);
        res.json(
            {
                isSuccess:false,
                message:`Err: ${err.message}`,
                data:{},
            }
        );
        // return;
    }
        res.status(200).json(
            {
                isSuccess:true,
                message:`Product created`,
                data:
                {
                    product:newproduct,
                },
            }
        )
    
    }
    catch(err)
    {
        console.log("🔴Error in creatingProductController");
        res.status(501).json(
            {
                isSuccess:false,
                message:"Internal Server Error"
            }
        )

    }

    
};
const getAllProducts=async (req,res)=>
{
    try{
        const allProducts=await Product.find();
         res.status(200).json(
            {
                isSuccess:true,
                message:"Product list fetched",

                data:
                {
                    products:allProducts,
                },
            }
        )

    }
    catch(err)
    {
        console.log("🔴 Error in getting All Products");
        res.status(501).json(
            {
                isSuccess:false,
                message:"Internal Server Error",

            }
        )
    }
}
const updateProductController=async (req,res)=>
{
    try{
        const{productId}=req.params;
        const newData=req.body;
        const newproduct=await Product.findByIdAndUpdate(productId,newData,{
            new:true,
            runValidators:true,
        });
        if(!newproduct)
        {
            return res.status(404).json(
                {
                    isSuccess:false,
                    message:"Product Not found",
                    data:{},
                }
            )
        }
        res.status(200).json(
            {
                isSuccess:true,
                message:"Product updated",
                data:
                {
                    product:newproduct,
                },
            }
        )
        
    }
    catch(err)
    {
        console.log("🔴 Error in updating  Products");
        res.status(500).json(
            {
                isSuccess:false,
                message:"Internal Server Error",
                data:{}

            }
        )
    }

    }

module.exports={updateProductController,createproductController,getAllProducts};