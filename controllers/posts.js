const Post = require('../models/post');

module.exports = app => {
    // INDEX
    app.post('/', (req, res) => {
      Post.find({})
          .then(posts => {
              res.render("posts-index", { posts });
          })
          .catch(err => {
              console.log(err.message);
          });
    });

    // CREATE
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
}