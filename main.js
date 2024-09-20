import Event from "node:events";
import { Server } from "socket.io";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {} from "node:worker_threads";
import {} from "node:perf_hooks"

class MyEmitter extends Event {}

class PlugPlay {
  constructor(port) {
    this.port = port;
    this.eventEmitter = new MyEmitter();

    this.io = new Server(this.port, {
      cors: {
        origin: "*",
        methods: ["GET"],
      },
    });
    console.log(`Server running on port ${this.port}`);
    this.connections = {};
    this.io.on("connection", (socket) => {
      console.log("a user connected");
      this.connections[socket.id] = socket;
      myEmitter.emit("new");
      socket.on("disconnect", () => {
        console.log("user disconnected");
        delete this.connections[socket.id];
      });
    });
  }
  getNumberOfConnections() {
    return Object.keys(this.connections).length;
  }
  getConnections() {
    return this.connections;
  }
  postEvent(event, data) {
    this.eventEmitter.emit(event, data);
  }
}

const main = new PlugPlay(3000);
