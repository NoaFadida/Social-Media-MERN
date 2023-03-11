import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));
app.use(bodyParser.json());

import cors from "cors";
app.use(cors())

import mongoose from "mongoose";
mongoose.connect(process.env.DATABASE_URL); //,{ useNewUrlParser: true})
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("connected to mongo DB");
});

import indexRouter from "./routes/index_route";
import userRoute from "./routes/user_route";
import postRouter from "./routes/post_route";
import authRouther from "./routes/auth_route";
import fileRouter from "./routes/file_route";
import chatRouter from "./routes/chat_route";

app.use("/", indexRouter);
app.use("/user", userRoute);
app.use("/post", postRouter);
app.use("/auth", authRouther);
app.use("/file", fileRouter);
app.use("/chat", chatRouter);

app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc"

if (process.env.NODE_ENV == "development") {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Web Dev 2022 REST API",
        version: "1.0.0",
        description: "REST server including authentication using JWT",
      },
      servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["./src/routes/*.ts"],
  };
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}

export = server;
