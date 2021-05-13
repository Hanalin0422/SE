var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var multer = require('multer');
var util = require('../util');

var storage  = multer.diskStorage({ // 2
    destination(req, file, cb) {
      cb(null, './public/event');
    },
    filename(req, file, cb) {
      cb(null, `${file.originalname}`);
    },
  });
  var uploadWithOriginalFilename = multer({ storage: storage }); 

  //create
router.post('/', uploadWithOriginalFilename.single('attachment'), function(req, res){
    Post.create(req.body, function(err, post){
      if(err){
        req.flash('posts', req.body);
        req.flash('errors', util.parseError(err));
        console.log(err);
        return res.redirect('/admin/form');
      }
      res.redirect('/admin/table');
    });
  });
  
  // show
  router.get('/:id', function(req, res){
    Post.findOne({_id:req.params.id})
      .exec(function(err, post){
        if(err) return res.json(err);
        res.render('admin/detail', {post:post});
      });
  });
  
  // edit
  router.get('/:id/edit', function(req, res){
    var post = req.flash('post')[0];
    var errors = req.flash('errors')[0] || {};
    if(!post){
      Post.findOne({_id:req.params.id}, function(err, post){
          if(err) return res.json(err);
          res.render('admin/modify', { post:post, errors:errors });
        });
    }
    else {
      post._id = req.params.id;
      res.render('admin/modify', { post:post, errors:errors });
    }
  });
  
  // update
  router.put('/:id',function(req, res){
    Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
      if(err){
        req.flash('post', req.body);
        req.flash('errors', util.parseError(err));
        return res.redirect('/posts/'+req.params.id+'/edit');
      }
      res.redirect('/posts/'+req.params.id);
    });
  });
  
  // destroy
  router.delete('/:id', function(req, res){
    Post.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/admin/table');
    });
  });
module.exports = router;