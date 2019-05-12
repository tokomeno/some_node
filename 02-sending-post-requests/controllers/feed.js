const {validationResult} = require('express-validator/check');
const fs  = require('fs')
const path  = require('path')
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find().then(posts => {
    res.json({posts})
  })
  .catch(err => next(err))
  // res.status(200).json({
  //   posts: [{ 
  //   _id: '1',
  //   title: 'First Post', 
  //   content: 'This is the first post!',
  //   imageUrl :'some.jpg',
  //   creator:{
  //     name:"mtoko"
  //   },
  //   date: new Date()
  //   }]
  // });
};

exports.createPost = (req, res, next) => {

const errors = validationResult(req);
if( !errors.isEmpty() ){
  const error = new Error("Validation failed");
  error.statusCode = 422
  throw error;
  // return res.status(422).json({message:'Validation failed, entered',
  // errors: errors.array()
};
if(!req.file){
  const error = new Error('No image provided');
  error.statusCode = 422
  throw error;
}
const imageUrl = req.file.path;

  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title, content, creator: {name: 'TOko'}
  })
  .save()
  .then(result => {
    console.log(result)
     res.status(201).json({
      message: 'Post created successfully!',
      post: { _id: new Date().toISOString(), title: title, content: content,
      creator: {name:'test'} },
      imageUrl
    });
  })
  .catch(err => {
    console.log(err)
    if(!err.statusCode){
        err.statusCode = 500
    }
    next(err)
  })
  // Create post in db
 
}


exports.getPost = (req, res, next) => {
  // console.log('321312')
  const postId = req.params.postId;
// res.json({postId})
  Post.findById(postId)
  .then(post => {
    if(!post){
       const error = new Error('Could not find post')
       error.statusCode = 404
       throw error;
    }
    res.json({post})
  })
  .catch(err => {
    next(err)
  })
}


exports.updatePost = (req, res, next) => {
  const errors = validationResult(req);
  if( !errors.isEmpty() ){
    const error = new Error("Validation failed");
    error.statusCode = 422
    throw error;
  };
  const postId = req.params.postId;
  const {title, content } = req.body
  let imageUrl = req.body.image
  console.log(imageUrl,  req.body, req.body.image, 111111111111111111111111111111)
   // if(req.file){
   //  imageUrl = req.file.path;
   // }
   if(!imageUrl){
    const error = new Error('No file picked')
    error.statusCode = 422
    throw error
   }

   Post.findById(postId)
    .then(post => {
        if(!post){
           const error = new Error('Could not find post')
           error.statusCode = 404
           throw error;
        }
        if(imageUrl !== post.imageUrl && post.imageUrl){
          clearImage(post.imageUrl)
        }

        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
        return post.save()
    })
    .then(result => {
      res.status(200).json({post:result})
    })
    .catch(err => next(err))


}


const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath)
    fs.unlink(filePath, err => console.log(err))
}