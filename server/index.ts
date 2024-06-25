import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

type clientData = {
  x: number;
  y: number;
};

let clientMap = new Map<Socket["id"], clientData>();

io.on("connection", (socket) => {
  console.log("new conn");
  const newClient: clientData = {
    x: 0,
    y: 0,
  };

  clientMap.set(socket.id, newClient);

  socket.on("move", (coords) => {
    console.log(coords)
  })

  socket.on("disconnect", () => {
    clientMap.delete(socket.id);
  })
});

io.listen(3001);

httpServer.listen(3000);
