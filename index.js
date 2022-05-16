const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./routers");

/// config body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// load rbac config
const createRbac = require("./loaders/default-rbac-casbin.loader");
createRbac();

/// check authorization
const author = require("./middlewares/authorization");
app.use(author);

/// config routers
app.use("/", router);

/// start app
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`SERVER START ON PORT:${PORT}`);
});
