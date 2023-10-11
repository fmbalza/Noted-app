import mongoose from "mongoose";
import config from "./config/config";


mongoose.connect("mongodb+srv://keki:keki@cluster0.bgkv4c6.mongodb.net/?retryWrites=true&w=majority");

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connection stablished')
});

connection.on('error', err => {
    console.log(err);
    process.exit(0)
});