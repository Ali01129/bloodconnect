import mongoose from "mongoose";

// Read at runtime - Next.js loads .env automatically
function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env");
  }
  return uri;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

async function connectWithRetry(uri, opts) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await mongoose.connect(uri, opts);
    } catch (e) {
      lastError = e;
      if (attempt < MAX_RETRIES && (e.code === "ETIMEOUT" || e.message?.includes("queryTxt"))) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      } else {
        throw e;
      }
    }
  }
  throw lastError;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    };
    cached.promise = connectWithRetry(getMongoUri(), opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
