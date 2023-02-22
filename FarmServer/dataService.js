
const jwt = require('jsonwebtoken')
const db = require('./db')

const register=(uid,fname,lname,mobno,password)=>{
     
    return db.User.findOne({uid})
    .then(user=>{
         if(user){
            
             return {
                 status : false,
                 statusCode : 400,
                 message : 'user already registered'
               }
         }
         else{
             const Newuser = new db.User({
                 uid: uid,
                 firstname:fname,
                 lastname:lname,
                 mobno:mobno,
                 password: password,
                 order:[]
               })  
               Newuser.save();
               return{
                 status :true,
                 statusCode:200,
                 message : "register Successfull"
               }
             }
     })
}
const login=(uid,pswd)=>{
    return db.User.findOne({uid}).then((result=>{
        if(result){
            if(result.password==pswd){
                const token = jwt.sign({currentUid:uid},'mykey')
                return{
                    status:true,
                    statusCode:200,
                    message:'Login Successful',
                    data:result,
                    token : token
                }
            }else{
                return{
                    status:false,
                    statusCode:400,
                    message:'Password Incorrect'
                }
            }
        }
        else{
            return{
                status:false,
                statusCode:400,
                message:'Account not found'
            }
        }
    }))
}
const getproduct=()=>{
    return db.Product.find().then(result=>{
        if(result){
            return {
                status:true,
                statusCode:200,
                product:result
            }
        }
        else{
            return{
                status:false,
                statusCode:400,
                message:'product not found'
            }
        }
    })
}

const adminLogin=(id,password)=>{
    return db.Admin.findOne({id}).then(result=>{
        if(result){
            if(result.password==password){
                return{
                    status:true,
                    statusCode:200,
                    message:'login successful'
                }
            }
            else{
                return{
                    status:false,
                    statusCode:400,
                    message:'incorrect password'
                }
            }
        }
        else{
            return{
                status:false,
                statusCode:400,
                message:'Incorrect admin ID'
            }
        }
    })
}


const addProduct=(pname,type,age,description,quality,price,image)=>{
    return db.Product.findOne({pname,quality}).then((item)=>{
        if(item){
                return{
                    status : false,
                    statusCode : 400,
                    message : "Product  already exist",
                }
            }
            else{
                const newproduct = new db.Product({
                    pname:pname,
                    type:type,
                    age:age,
                    description:description,
                    quality:quality,
                    price: price,
                    image:image
                })
                    newproduct.save();
                    return {
                        status : true,
                        statusCode : 200,
                        message : "Product added Successfull"
                  }
            } 
    })   
}

const addtowish=(product,uid)=>{
    return db.User.findOne({uid}).then((user)=>{

        if(user){
            if(user.wishlist.find(products=>products.pname==product.pname)){
                return{
                    status:false,
                    statusCode:400,
                    message:'Product Already Exist'
                }
            }
            else{

             user.wishlist.push(product);
             return user
          .save()
          .then(() => {
            return {
                status : true,
                statusCode:200,
                message:'Product added to wishlist',
                data:user.wishlist
            }
        })
    }
}
        else{
            return {
                status :false,
                statusCode :400,
                message:'Please Login First'
            }
        } 
})
}
const getwish=(uid)=>{
    return db.User.findOne({uid}).then(user=>{
        if(user){
            return{
                status:true,
                statusCode:200,
                products:user.wishlist
            }
        }
        else{
            return{
                status:false,
                statusCode:400,
                message:'Please Login First'
            }
        }
    })
}
const addtocart=(product,uid)=>{
    return db.User.findOne({uid}).then((user)=>{

        if(user){
            if(user.cart.find(products=>products.pname==product.pname)){
                return{
                    status:false,
                    statusCode:400,
                    message:'Product Already Exist',
                }
            }
            else{

             user.cart.push(product);
             return user
          .save()
          .then(() => {
            return {
                status : true,
                statusCode:200,
                message:'Product added to cart',
                cartData:user.cart
                // products:user.cart
            }
        })
    }
}
        else{
            return {
                status :false,
                statusCode :400,
                message:'Please Login First'
            }
        } 
})
}
const getcart=(uid)=>{
    return db.User.findOne({uid}).then(user=>{
        if(user){
            return{
                status:true,
                statusCode:200,
                products:user.cart
            }
        }
        else{
            return{
                status:false,
                statusCode:400,
                message:'Please Login First'
            }
        }
    })
}
const getprofile=(uid)=>{
    return db.User.findOne({uid}).then(user=>{
        if(user){
            return{
                status:true,
                statusCode:200,
                userData:user,
                message:'set set'
            }
        }
        else{
            return{
                status:false,
                statusCode:400,
                message:'Please Login First'
            }
        }
    })
}
const DeleteProduct=(id)=>{
    return db.Product.deleteOne({_id:id}).then((result)=>{
       
        return{
            status:true,
            statusCode:200,
            message:"Product deleted successfully"
        }
    })
}

    const deletewish = async (uid,product_id) => {
        try {
          const user = await db.User.findOne({ uid: uid });
          const wishlist = user.wishlist.filter((product) => product._id != product_id);
          user.wishlist = wishlist;
          await user.save();
          return {
            status: true,
            statusCode: 200,
            message: 'Product removed from wishlist successfully',
          };
        } catch (error) {
          return {
            status: false,
            statusCode: 500,
            message: 'Unable to remove product from wishlist',
          };
        }
      };
    const DeleteCart= async (uid,product_id)=>{
        try{
            const user = await db.User.findOne({uid:uid});
            const cart = user.cart.filter((product)=>product._id != product_id);
            user.cart = cart;
            await user.save();
            return {
                status: true,
                statusCode: 200,
                message: 'Product removed from cart successfully',
            }
        } catch(error) {
            return {
                status: false,
                statusCode: 500,
                message: 'Unable to remove product from cart',
              }
        }
    };
    const deleteAccount=(uid)=>{
        return db.User.deleteOne({uid:uid}).then(result=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message: 'Account Deleted Successfully'
                }
            }
            else{
                return{
                    status:false,
                    statusCode:500,
                    message: "can't  Delete your account"
                }
            }
        })
    }
    const search=(searchkey)=>{
        return db.Product.find({type:searchkey}).then(result=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    data:result
                }
            }
            else{
                return{
                    status:false,
                    statusCode:500,
                    message:'No products Found'
                }
            }
        })
    }
    const updatepassword=(uid,currentpassword,newpass)=>{
        return db.User.findOne({uid:uid}).then(user=>{
            if(user){
                if(user.password==currentpassword){
                    user.updateOne({$set:{password:newpass}})
                        return {
                            status:true,
                            statusCode:200,
                            message:'Password Successfully Updated'
                        }
                }
                else{
                    return{
                        status:false,
                        statusCode:400,
                        message:'Please enter correct password'
                    }
                }
            }
            else{
                return{
                    status:false,
                    statusCode:400,
                    message:'please Login'
                }
            }
        })
    }
      


module.exports={
    register,
    login,
    getproduct,
    adminLogin,
    addProduct,
    addtowish,
    getwish,
    getprofile,
    getcart,
    addtocart,
    DeleteProduct,
    deletewish,
    DeleteCart,
    deleteAccount,
    search,
    updatepassword
}