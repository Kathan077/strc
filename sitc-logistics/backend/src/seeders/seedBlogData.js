require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const BlogPost = require('../models/BlogPost');

// Load original blog posts from frontend data source
const { BLOG_POSTS } = require('../../../frontend/src/data/blogData');

const seedBlogs = async () => {
  try {
    await connectDB();
    console.log('[Blog Seeder] Connected to MongoDB Atlas...');

    for (const post of BLOG_POSTS) {
      const existing = await BlogPost.findOne({ slug: post.slug });
      if (!existing) {
        await BlogPost.create(post);
        console.log(`[Blog Seeder] Seeded post: ${post.slug}`);
      } else {
        console.log(`[Blog Seeder] Post already exists: ${post.slug} (skipping)`);
      }
    }

    const count = await BlogPost.countDocuments();
    console.log(`[Blog Seeder] Completed successfully! Total blogs in DB: ${count}`);
    process.exit(0);
  } catch (error) {
    console.error('[Blog Seeder Error]:', error);
    process.exit(1);
  }
};

seedBlogs();

