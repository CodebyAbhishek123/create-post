const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.services');
const postModel = require('./models/post.model');
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ✅ Multer setup
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Create Post Route
app.post('/create-post', upload.single('image'), async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    // ❗ Important check
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required"
      });
    }

    // ✅ Upload to ImageKit
    const result = await uploadFile(req.file.buffer);

    // ✅ Save to DB
    const post = await postModel.create({
      image: result.url,
      caption: req.body.caption,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

// ✅ Get Posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await postModel.find();

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching posts"
    });
  }
});

module.exports = app;