import express, { Express } from "express";
import { engine } from "express-handlebars";
import path from "node:path";

import emailRoutes from "./src/routes/email-routes";

const app: Express = express();

app.engine(
  "hbs",
  engine({
    extname: ".hbs",

    helpers: {
      eq: (a, b) => a === b,
    },

    defaultLayout: "main",

    layoutsDir: path.join(
      process.cwd(),
      "src/templates/layouts"
    ),

    partialsDir: path.join(
      process.cwd(),
      "src/templates/partials"
    ),
  })
);

app.set("view engine", "hbs");

app.set(
  "views",
  path.join(
    process.cwd(),
    "src/templates/emails"
  )
);

app.use(
  "/images",
  express.static(
    path.join(process.cwd(), "src/images")
  )
);

app.use("/", emailRoutes);

export default app;