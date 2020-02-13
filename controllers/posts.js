const Post = require('../models/post');
const User = require('../models/user');

module.exports = app => {
  // INDEX
  app.get('/', (req, res) => {
    const currentUser = req.user
    Post.find({}).populate('author').lean() // added .lean() to fix  'Access has been denied to resolve the property "url" because it is not an "own property" of its parent.'
      .then(posts => {
        res.render("posts-index", {
          posts,
          currentUser
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // CREATE
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  });

  app.post("/posts/new", (req, res) => {
    if (req.user) {
      const post = new Post(req.body);
      post.author = req.user._id;

      post
        .save()
        .then(post => {
          return User.findById(req.user._id);
        })
        .then(user => {
          user.posts.unshift(post);
          user.save();
          // REDIRECT TO THE NEW POST
          res.redirect(`/posts/${post._id}`);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  // Show one post
  app.get("/posts/:id", function (req, res) {
    const currentUser = req.user;
    // LOOK UP THE POST

    Post.findById(req.params.id).populate({
        path: 'comments',
        populate: {
          path: 'author'
        }
      }).populate('author').lean()
      .then(post => {
        res.render("post-show", {
          post,
          currentUser
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function (req, res) {
    const currentUser = req.user;
    Post.find({
        subreddit: req.params.subreddit
      }).populate('author').lean()
      .then(posts => {
        res.render("posts-index", {
          posts,
          currentUser
        });
      })
      .catch(err => {
        console.log(err);
      });
  });


}