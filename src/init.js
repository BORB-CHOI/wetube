import "@babel/polyfill"; // async funtion을 사용하기 위해 가져온 것
import dotenv from "dotenv";
import "./db";
import app from "./app";

import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.PORT || 9090;

const handleListening = () =>
  console.log(`✔ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
