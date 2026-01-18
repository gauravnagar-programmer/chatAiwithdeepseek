import mongoose from "mongoose";

const Mongodb_Url = process.env.MONGODB_CONNECTION;

if (!Mongodb_Url) throw new Error("Please , provide mongodb url first");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function Connection() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(Mongodb_Url).then((mongoose) => mongoose);
  }
  try {
    cached.conn = await cached.promise;
    console.log('successfully connected')
  } catch (error) {
    console.log("server crased ", error);
  }
  return cached.conn
}
