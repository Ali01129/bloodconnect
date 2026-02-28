import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env");
  }
  return uri;
}

let cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };
if (!global.mongoose) {
  global.mongoose = cached;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

async function connectWithRetry(
  uri: string,
  opts: mongoose.ConnectOptions
): Promise<typeof mongoose> {
  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await mongoose.connect(uri, opts);
    } catch (e) {
      lastError = e as Error;
      const err = e as { code?: string; message?: string };
      if (attempt < MAX_RETRIES && (err.code === "ETIMEOUT" || err.message?.includes("queryTxt"))) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      } else {
        throw e;
      }
    }
  }
  throw lastError;
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
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
