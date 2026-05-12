import express, { Express } from "express";
import { engine } from "express-handlebars";
import path from "node:path";

import emailRoutes from "./routes/email-routes";

const app: Express = express();

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
helpers: {
  eq: function (a: any, b: any) {
    return String(a) === String(b);
  }
},

    defaultLayout: "main",

    layoutsDir: path.join(
      process.cwd(),
      "templates/layouts"
    ),

    partialsDir: path.join(
      process.cwd(),
      "templates/partials"
    ),
  })
);

app.set("view engine", "hbs");

app.set(
  "views",
  path.join(
    process.cwd(),
    "templates/emails"
  )
);

app.use(
  "/images",
  express.static(
    path.join(process.cwd(), "/images")
  )
);

app.use("/", emailRoutes);

export default app;