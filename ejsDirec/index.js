const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); // Set the views directory  

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render("home");  // ejs renderinng 
});
app.get('/rolldice', (req, res) => {
  let diceValue = Math.floor(Math.random() * 6) + 1; // Generate a random number between 1 and 6
  res.render("rolldice.ejs",{diceValue});// ejs renderinng 
});

app.get('/ig/:username', (req, res) => {
  let { username } = req.params; // Extract username from the URL parameters
   const instaData=require("./data.json")
  const data = instaData[username];
  console.log(data);
  if (data) {
     res.render("instagram.ejs", {data});// ejs renderinng

  } else {
    res.render("error.ejs", { username }); // Render an error page if the username is not found
  }
 
 



  // let { username } = req.params; // Extract username from the URL parameters
  //console.log(`Username: ${username}`); // Log the username to the console);
  // const followers=[ "adam", "john", "jane", "doe" ];// Example array of followers
  // res.render("instagram.ejs", { username, followers }); // Render the instagram.ejs template with the username

 


});





app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
