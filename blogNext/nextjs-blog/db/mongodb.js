import mongoose from "mongoose";

let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}
async function dbConnect() {
    if (cached.conn) { return cached.conn }
    if(!cached.promise) {
        const opts = {
            maxPoolSize: 10,
            user:"yuexi",
            pass:"yuexi",
            authSource:"admin"
          }
          cached.promise = mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL,opts).then(mongoose=>{
            return mongoose
          })
    }
    cached.conn  = await cached.promise;
    return cached.conn
}

export default dbConnect;