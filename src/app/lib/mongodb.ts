// import mongoose from 'mongoose';

// // Ensure MONGODB_URI is defined
// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// // Define a type-safe cache interface
// interface MongooseCache {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// }

// // Use globalThis with proper typing to avoid ESLint no-undef or global-assign
// declare global {
//   // eslint-disable-next-line no-var
//   var mongooseCache: MongooseCache | undefined;
// }

// // Initialize cache
// const cached: MongooseCache = (globalThis.mongooseCache ??= { conn: null, promise: null });

// export async function connectToDatabase(): Promise<typeof mongoose> {

//   if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
// }
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       bufferCommands: false,
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//     return cached.conn;
//   } catch (error: unknown) {
//     cached.promise = null;
//     // Re-throw with type safety
//     throw new Error(`Failed to connect to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
//   }
// }

import mongoose from 'mongoose';

// Ensure MONGODB_URI is defined
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Define a type-safe cache interface
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = (globalThis.mongooseCache ??= { conn: null, promise: null });

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error: unknown) {
    cached.promise = null;
    throw new Error(`Failed to connect to MongoDB: ${error instanceof Error ? error.message : String(error)}`);
  }
}