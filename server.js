const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();


// HANDLEBARS CONFIG

app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",

    defaultLayout: "main",

    layoutsDir: path.join(__dirname, "templates/layouts"),

    partialsDir: path.join(__dirname, "templates/partials"),
    
    
  })
);

app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "templates/emails"));
app.use('/images', express.static(path.join(__dirname, 'images')));

// PREVIEW ROUTE

app.get("/preview", (req, res) => {

  res.render("new-user-created", {

    layout: "main",

    title: "Welcome User",

    userName: "John Doe",

    message: "Your account has been created successfully.",

    userDetails: [
      {
        label: "Name",
        value: "John Doe",
      },
      {
        label: "Email",
        value: "john@gmail.com",
      },
      {
        label: "phone",
        value: "123-456-7890",
      },
      {
        label: "Role",
        value: "Admin",
      },
      {
        label: "Group",
        value: "-",
      },
    ],

    createdDetails: [
      {
        label: "Created By",
        value: "Admin",
      },
      {
        label: "Date",
        value: "Today",
      },
    ],
  });
});


// SERVER

app.listen(3000, () => {
  console.log("Server running on port 3000");
});