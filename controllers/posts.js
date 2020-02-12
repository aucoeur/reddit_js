const Post = require('../models/post');

module.exports = app => {
  // INDEX
  app.get('/', (req, res) => {
    Post.find({}).lean() // added .lean() to fix  'Access has been denied to resolve the property "url" because it is not an "own property" of its parent.'
      .then(posts => {
        res.render("posts-index", {
          posts
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
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      console.log(`Error: ${err}`);
      console.log(`Post: ${post}`);
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

  // Show one post
  app.get("/posts/:id", function (req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).lean()
      .then(post => {
        res.render("posts-show", {
          post
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function (req, res) {
    Post.find({
        subreddit: req.params.subreddit
      }).lean()
      .then(posts => {
        res.render("posts-index", {
          posts
        });
      })
      .catch(err => {
        console.log(err);
      });
  });


}