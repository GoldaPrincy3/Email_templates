import express from "express";
import path from "path";
import { engine } from "express-handlebars";

import emailRoutes from "./routes/email-routes";

const app = express();

app.engine(
  "hbs",
  engine({
    extname: ".hbs",

    defaultLayout: "main",

    layoutsDir: path.join(
      process.cwd(),
      "templates/layouts"
    ),

    partialsDir: path.join(
      process.cwd(),
      "templates/partials"
    ),
     helpers: {
      eq: (a: any, b: any) => a === b
    }
  })
);

app.set("view engine", "hbs");
app.use("/images", express.static("images"));
app.set(
  "views",
  path.join(process.cwd(), "templates/emails")
);

app.use("/", emailRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});