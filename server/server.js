const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const config = require('./config/config').get(process.env.NODE_ENV);
const {User} = require('./models/user');
const {Book} = require('./models/book');
const {auth} = require('./middleware/auth');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static('client/build'));


//BOOK REQUESTS//
//GET 1 BOOK//
app.get('/api/getBook',(req,res)=>{
    let id = req.query.id;
    Book.findById(id,(err,doc)=>{
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

//GET MANY BOOKS//
app.get('/api/getBooks',(req,res)=>{
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    //ORDER = asc || desc
    Book.find().sort({updatedAt:order}).skip(skip).limit(limit).exec((err,doc)=>{
        if (err) return res.status(400).send(err);
        res.send(doc);
    })                    
})

//POST BOOK//
app.post('/api/book',(req,res)=>{
    const book = new Book(req.body)

    book.save((err,doc)=>{
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            bookId:doc._id
        })
    })
})

//UPDATE BOOK//
app.post('/api/updateBook',(req,res)=>{
    Book.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if (err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        });
    })
})

//DELETE BOOK//
app.delete('/api/deleteBook',(req,res)=>{
    let id = req.query.id;
    Book.findByIdAndRemove(id,(err,doc)=>{
        if (err) return res.status(400).send(err);
        res.json(true)
    })
})


//USER REQUESTS//
//GET IS AUTH?//
app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
})

//GET LOGOUT//
app.get('/api/logout',auth,(req,res)=>{
    req.user.delToken(req.token,(err,user)=>{
        if (err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

//GET REVIEWER//
app.get('/api/getReviewer',(req,res)=>{
    let id = req.query.id;
    User.findById(id,(err,user)=>{
        if (err) return res.status(400).send(err);
        res.json({
            name:user.name,
            lastname:user.lastname
        })
    })
})

//GET USERS//
app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if (err) return res.status(400).send(err);
        res.status(200).send(users);
    })
})

//GET ALL REVIEWS OF A PARTICULAR USER//
app.get('/api/userReviews',(req,res)=>{
    Book.find({ownerId:req.query.user}).exec((err,reviews)=>{
        if (err) return res.status(400).send(err);
        res.send(reviews)
    })
})

//POST REGISTER//
app.post('/api/register',(req,res)=>{
    const user = new User(req.body);

    user.save((err,doc)=>{
        if (err) return res.json({success:false});
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})

//POST LOGIN//
app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'});
        
        user.comparePasswords(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            user.genToken((err,user)=>{
                if(err) return res.status(401).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

if(process.env.NODE_ENV === 'production'){
    const path = require('path')
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}


const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log('SERVER IS UP');
})