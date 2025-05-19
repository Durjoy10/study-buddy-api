const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ForumPost = require('../models/ForumPost');
const ForumComment = require('../models/ForumComment');
const User = require('../models/User');

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await ForumPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single post
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new post
router.post('/posts', auth, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    console.log("Creating post with user data:", req.user); // Debug log
    
    if (!req.user || !req.user._id) {
      console.log("User not authenticated - req.user:", req.user); // Debug log
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Create post with user data from auth middleware
    const post = new ForumPost({
      title,
      content,
      category,
      author: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profilePicture: req.user.profilePicture
      }
    });

    console.log("Post data before save:", post); // Debug log
    const savedPost = await post.save();
    console.log("Saved post:", savedPost); // Debug log
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error); // Debug log
    res.status(400).json({ message: error.message });
  }
});

// Update a post
router.patch('/posts/:id', auth, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }
    Object.assign(post, req.body);
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a post
router.delete('/posts/:id', auth, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get comments for a post
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await ForumComment.find({ post: req.params.postId })
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a comment
router.post('/comments', auth, async (req, res) => {
  try {
    const { post, content } = req.body;
    console.log("Creating comment with user data:", req.user); // Debug log
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Get full user data from database
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const comment = new ForumComment({
      post,
      content,
      author: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      }
    });

    console.log("Comment data before save:", comment); // Debug log
    const savedComment = await comment.save();
    console.log("Saved comment:", savedComment); // Debug log
    res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment:", error); // Debug log
    res.status(400).json({ message: error.message });
  }
});

// Update a comment
router.patch('/comments/:id', auth, async (req, res) => {
  try {
    const comment = await ForumComment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }
    Object.assign(comment, req.body);
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a comment
router.delete('/comments/:id', auth, async (req, res) => {
  try {
    const comment = await ForumComment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }
    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle like on a post
router.post('/posts/:id/like', auth, async (req, res) => {
  try {
    const post = await ForumPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const likeIndex = post.likes.indexOf(req.user._id);
    if (likeIndex === -1) {
      post.likes.push(req.user._id);
    } else {
      post.likes.splice(likeIndex, 1);
    }
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Toggle like on a comment
router.post('/comments/:id/like', auth, async (req, res) => {
  try {
    const comment = await ForumComment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    const likeIndex = comment.likes.indexOf(req.user._id);
    if (likeIndex === -1) {
      comment.likes.push(req.user._id);
    } else {
      comment.likes.splice(likeIndex, 1);
    }
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark comment as answer
router.post('/comments/:id/answer', auth, async (req, res) => {
  try {
    const comment = await ForumComment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    const post = await ForumPost.findById(comment.post);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the post author can mark answers' });
    }
    comment.isAnswer = !comment.isAnswer;
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 