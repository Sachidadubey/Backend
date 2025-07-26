const express =require('express');
const app = express();
const port = 8080;
const path = require('path'); 
// importing the required modules
app.set("view engine", "ejs");
// setting up the view engine to use ejs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const {v4: uuidv4} = require('uuid');
// importing the uuid module to generate unique ids for the posts 
const methodOverride = require('method-override');
// importing the method-override module to use patch and delete methods in the form
app.use(methodOverride('_method'));
// using the method-override middleware to override the method in the form
app.set('views', path.join(__dirname, 'views'));
// setting the views directory to the views folder
app.use(express.static(path.join(__dirname, 'public')));
// setting up the view engine to use ejs and setting the views directory
 
let posts = [
  {
    id: uuidv4(), // generating a unique id for each post",
    username: 'John Doe',
    content: 'My First Post',
  }
  , {
    id: uuidv4(),
    username: 'sachida dubey',
    content: 'hard work is important to achieve success'
  },
  {
    id: uuidv4(),
    username: 'deepak',
    content: 'dont do doglai',
  }
];
// this is the array of posts that will be used to render the posts in the index.ejs file

app.get('/posts', (req, res) => {
  res.render("index.ejs", { posts });// sending all data to the index.ejs file
  //which will render the posts
}); 
// this will render the index.ejs file with the posts data

app.get('/posts/new', (req, res) => {
  res.render("new.ejs");
});
// this will render the new.ejs file to add a new post



app.post('/posts', (req, res) => {
  let { username, content } = req.body;
  posts.push({id: uuidv4(),username,content});
  res.redirect('/posts');
  // redirecting to the posts page after adding a new post
});
// this will add a new post to the posts array and redirect to the posts page

app.get('/posts/:id', (req, res) => {
  let { id } = req.params;// getting the id from the url

  
  let post = posts.find((p) => id === p.id);
  // finding the post with the given id in the posts array
  // if the post is found, it will be sent to the show.ejs file
  if (!post) {
    return res.render("error.ejs", { message: "Post not found" });
  }
  else {
    res.render("show.ejs", { post });

  }



  // if (post) {
  //   res.send("request working");
  // }
  // else {
  //   res.status(404).send("Post not found");
  // }
}
);
// this will find the post with the given id and send it to the client





// patch method to update the post
app.patch('/posts/:id', (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
   let post = posts.find((p) => id === p.id);
  
  post.content = newcontent;
  res.redirect('/posts');
  // redirecting to the show page of the post after updating it

});
 
app.get('/posts/:id/edit', (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
 
    res.render("edit.ejs", { post });
  

 
});
app.delete('/posts/:id', (req, res) => {
  let { id } = req.params;
  // posts = posts.filter((p) => p.id !== id);
  // filtering out the post with the given id from the posts array
   posts=posts.filter((p) => p.id !== id);
  res.redirect('/posts');
  // redirecting to the posts page after deleting the post
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// this will start the server on the given port and log the message to the console
// the server will be running on http://localhost:8080/posts