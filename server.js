const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);


/*const http = require("http");
const app = require("./backend/app");

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);
console.log("Running on port " + port);
server.listen(port);
*/
/*
// create a server variable
const http = require("http");
const server = http.createServer((req, res) => {
  res.end("This is my first response");
});

const port = process.env.PORT || "3000";

console.log("Running on port " + port);
// listen at a port
server.listen(port);
*/
/*

var express = require("express");
var app = new express();

const port = process.env.PORT || "3000";

app.get("/", function (req, res) {
  res.send("Hello from Express");
});

app.listen(port, function () {
  console.log("Running on port " + port);
});
*/


