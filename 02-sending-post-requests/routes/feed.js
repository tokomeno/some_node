const express = require('express');

const {body} = require('express-validator/check');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post('/post', [
	body('title').trim().isLength({min:8}),
	body('content').trim().isLength({min:5})
], feedController.createPost);

router.get('/post/:postId', feedController.getPost);

router.put('/post/:postId', feedController.updatePost)

module.exports = router;