const express = require('express');
const cors=require('cors')
const jwt = require('jsonwebtoken')
const dataService = require('./dataService')

const app = express();

app.use(express.json());

app.listen(3000,()=>{
    console.log('listening on port 3000');
});

app.use(cors({
    origin:'http://localhost:4200'
}))

app.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.uid,req.body.fname,req.body.lname,req.body.mobno,req.body.password)//data
    .then(result=>{
        res.status(result.statusCode).json(result);
    })//access 
})


app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.uid,req.body.pswd)//access
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})
app.get('/getproduct',(req,res)=>{
    dataService.getproduct()
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
});
// app.get('/getfishes',(req,res)=>{
//     dataService.getfishes()
//     .then(result=>{
//         res.status(result.statusCode).json(result);
//     })
// })
app.post('/adminlogin',(req,res)=>{
    dataService.adminLogin(req.body.id,req.body.password).then(result=>{
        res.status(result.statusCode).json(result);
    })
})
app.post('/add-details',(req,res)=>{
    dataService.addProduct(
        req.body.pname,
        req.body.type,
        req.body.age,
        req.body.description,
        req.body.quality,
        req.body.price,
        req.body.image)
        .then(result=>{
        res.status(result.statusCode).json(result);
    })
})
app.post('/addtowish',(req,res)=>{
    dataService.addtowish(
        req.body.product,
        req.body.uid
    )
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})
app.post('/getwish',(req,res)=>{
    dataService.getwish(req.body.uid).then(result=>{
        res.status(result.statusCode).json(result);
    })
})
const jwtMiddleware=(req,res,next)=>{
    console.log('Router specific middleware');
    const token = req.headers['x-access-token'];
    //verify token - verify()
    const data=jwt.verify(token,'mykey');
    console.log(data);
    next();
}
app.post('/getprofile',(req,res)=>{
    dataService.getprofile(req.body.uid).then(result=>{
        res.status(result.statusCode).json(result);
    })
})

app.post('/getcart',(req,res)=>{
    dataService.getcart(req.body.uid).then(result=>{
        res.status(result.statusCode).json(result);
    })
})

app.post('/addtocart',(req,res)=>{
    dataService.addtocart(
        req.body.product,
        req.body.uid
    )
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})
app.post('/deleteproduct',(req,res)=>{
    dataService.DeleteProduct(req.body.id).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/deletewish',(req,res)=>{
    dataService.deletewish(
        req.body.uid,
        req.body.id
    ).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/deletecart',(req,res)=>{
    dataService.DeleteCart(
        req.body.uid,
        req.body.product_id
    ).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/deleteaccount',(req,res)=>{
    dataService.deleteAccount(req.body.uid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/search',(req,res)=>{
    dataService.search(req.body.searchkey).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/up',(req,res)=>{
    dataService.UpdatePassword(req.body.uid,req.body.currentpassword,req.body.newpass).then(result=>{
        res.status(result.statusCode).json(result)
    }) 
})
app.post('/addaddress',(req,res)=>{
    dataService.AddAddress(
        req.body.uid,
        req.body.houseno,
        req.body.postoffice,
        req.body.place,
        req.body.pin,
        req.body.district,
        req.body.state,
        req.body.country
    ).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/getaddress',(req,res)=>{
    dataService.getAddress(req.body.uid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/placeorder',(req,res)=>{
    dataService.placeOrder(req.body.uid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/getmyorders',(req,res)=>{
    dataService.getmyorders(req.body.uid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})