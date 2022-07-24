const http = require("http");
require("dotenv").config();
const debug = require("debug")("app:server");
const app = require("./app");
require("./app/services/swaggerDocs")(app);

const port = process.env.PORT ?? 4000;

// Server creation using "app" config
const server = http.createServer(app);

server.listen(port, "localhost", () => {
  debug(`Server started on http://localhost:${port}`);
});