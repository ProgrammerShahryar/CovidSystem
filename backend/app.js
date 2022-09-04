const express = require ('express')
const bodyParser = require ('body-parser')
const Test = require('./models/test');
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");
const User = require("./models/user");
const jwt = require('jsonwebtoken');
const checkAuth = require("./middleware/check-auth");
const CentreName =require('./models/testCentre');
const Stock = require('./models/stock');

const app = express();

mongoose.connect("mongodb+srv://max:yaAYKiFKFav5JkRw@cluster0.gknmv.mongodb.net/Test?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch (() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.put("/api/tests/:id", checkAuth, (req, res, next) => {
  const test = new Test({
    _id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    condition: req.body.condition,
    symptoms: req.body.symptoms,
    proposedDate: req.body.proposedDate,
    resultDate: req.body.resultDate,
    result: req.body.result,
    status: req.body.status
  });
  Test.updateOne({ _id: req.params.id }, test).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

app.delete('/api/tests/:id', checkAuth, (req, res, next) => {
  Test.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message: "Test deleted!"});
  })
});

app.post('/api/user/register', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      username: req.body.username,
      password: hash
    });
    user.save()
    .then(result =>{
      res.status(201).json({
        message: 'User created',
        result:result
      });
    })
    .catch(err => {
      res.status(500).json({
        error:err
      });
    });
  });
});

app.post("/api/tests", checkAuth, (req, res, next) => {
  const test = new Test({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    condition: req.body.condition,
    symptoms: req.body.symptoms,
    proposedDate: req.body.proposedDate,
    resultDate: req.body.resultDate,
    result: req.body.result,
    status: req.body.status
  });
  test.save();


  console.log(test);
  res.status(201).json({
    message: 'Test added Successfully'
  });
});

app.get('/api/tests',(req, res, next) => {
  Test.find().then(documents => {
    res.status(200).json({
      message: 'Post fetched successfully',
      tests: documents
    });
  })
});

app.post('/api/user/login',(req, res, next)=>{
  let fetchedUser;
  User.findOne({username: req.body.username})
    .then(user =>{
      if(!user){
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      if(!result){
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        {username: fetchedUser.username, userId: fetchedUser._id},
        'secret this should be longer',
        {expiresIn: '1h'}
      );
      res.status(200).json({
        token: token
      })
    })
    .catch(err =>{
      return res.status(401).json({
        message: 'Auth failed'
      });
    })
});
//Register test centre
app.post("/api/testCentres", checkAuth,(req, res, next) => {
  const centreName = new CentreName({
    centreName: req.body.centreName
  });
  centreName.save();


  console.log(centreName);
  res.status(201).json({
    message: 'Test Centre Registered Successfully'
  });
});
//Record Officer
app.post("/api/user", checkAuth, (req, res, next) => {
  const officer = new User({
    username: req.body.username,
    password: req.body.password,
  });
  officer.save();


  console.log(officer);
  res.status(201).json({
    message: 'Test Officer Registered Successfully'
  });
});

//Add stock
app.post("/api/stocks", checkAuth, (req, res, next) => {
  const stock = new Stock({
    stockName: req.body.stockName,
    stockNumber: req.body.stockNumber,
  });
  stock.save();

  console.log(stock);
  res.status(201).json({
    message: 'New Stock Added Successfully'
  });
});

//update stock
app.put("/api/stocks/:id", checkAuth, (req, res, next) => {
  const stock = new Stock({
    _id: req.body.id,
    stockName: req.body.stockName,
    stockNumber: req.body.stockNumber,

  });

  Stock.updateOne({ _id: req.params.id }, stock).then(result => {
    console.log(result);
    res.status(200).json({ message: "Stock Update successful!" });
  });
});
app.get('/api/stocks',(req, res, next) => {
  Stock.find().then(documents => {
    res.status(200).json({
      message: 'Post fetched successfully',
      Stock: documents
    });
  })
});

module.exports = app;
