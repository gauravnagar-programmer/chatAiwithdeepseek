import mongoose from "mongoose";

const Mongodb_Url = process.env.MONGODB_CONNECTION;

if (!Mongodb_Url) throw new Error("Please , provide mongodb url first");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function Connection() {
  if (cached.conn) return;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.log("server crased ", error);
  }
  return cached.conn
}
