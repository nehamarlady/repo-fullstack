const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const express = require("express");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get("/form", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.write('<form action="/submit" method= "post">');
  res.write('<label for="name"> usernameame: </label>');
  res.write('<input type="text" name="name" id="name"><br>');
  res.write('<label for="email"> email: </label>');
  res.write('<input type="email" name="email" id="email"><br>');
  res.write('<input type="submit">');
  res.end();
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  console.log(`Name: ${req.body.name}`);
  console.log(`Email: ${req.body.email}`);
  res.send(`Form Submitted`);
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
