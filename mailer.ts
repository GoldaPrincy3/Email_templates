import nodemailer from "nodemailer";
import path from "node:path";

const hbs = require("nodemailer-express-handlebars");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.use(
  "compile",

  hbs({
    viewEngine: {
      extname: ".hbs",

      partialsDir: path.join(
        process.cwd(),
        "templates/partials"
      ),

      layoutsDir: path.join(
        process.cwd(),
        "templates/layouts"
      ),

      defaultLayout: "main",
    },

    viewPath: path.join(
      process.cwd(),
      "templates/emails"
    ),

    extName: ".hbs",
  })
);

export default transporter;