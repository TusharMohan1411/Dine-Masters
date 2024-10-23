import mongoose from "mongoose";

const DB_URL =
  "mongodb+srv://tusharmohan0416:Tushar7404@cluster0tushar.i6yte.mongodb.net/dine-masters?retryWrites=true&w=majority&appName=Cluster0Tushar";

export const connectDB = async () => {
  await mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Mongo DB Connected");
    })
    .catch(() => {
      console.log("Mongo DB Conenction Error");
    });
};
