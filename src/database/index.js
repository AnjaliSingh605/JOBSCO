import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect("mongodb+srv://anjalijobsco:anjalijobsco@cluster0.zkuvi2i.mongodb.net/");
        isConnected = true;
        console.log("Job Board database connected successfully");
    } catch (err) {
        console.log(err);
    }
}

export default connectToDB;