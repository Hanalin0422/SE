// destination_create
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://iqeq1945:sksmsdit12@cluster0.3rl9c.mongodb.net/test?retryWrites=true&w=majority';
var Destination = require('../models/destination');



// 주소 등록
router.post('/Create/:id', async function create (req, res, next) {
    await new Destination({
      user: req.body.username,
      name: req.body.destination_name,
      post: req.body.postcode,
      roadAddress: req.body.roadAddress,
      detailAddress: req.body.detailAddress,
      contact: req.body.destination_number
    }).save().then(function(db){
      console.log(db) // 저장한 데이터
    })
});
  
  module.exports = router;