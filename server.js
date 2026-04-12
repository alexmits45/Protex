const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("mensaje", (data) => {
    io.emit("mensaje", data); // envía a todos
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

server.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});