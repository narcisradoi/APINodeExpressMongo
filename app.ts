import * as express from "express";
import * as mongoose from "mongoose";
import * as Routes from "./routes/index";
import * as dotenv from "dotenv";

// if cors required for testing
// import cors from "cors";
// app.use(cors());

//initialise the .env file
dotenv.config();

//set the app
const app = express();

//listener
app.listen(19000);

//use json
app.use(express.json());

//setup routes here
app.use("/posts", Routes.Posts);

//connect to db
const connectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7ghan.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (error) {
    console.log(error);
  }
};
connectToDB();

const gracefulExit = () => {
  mongoose.disconnect();
  console.log("disconnected");
};

process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);
