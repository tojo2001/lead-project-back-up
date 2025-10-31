import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("Please add your MongoDB URI to .env.local");

// ?? Increase connection + socket timeouts here
const options = {
  connectTimeoutMS: 120000, // 2min to establish connection
  socketTimeoutMS: 120000, // 2min to keep socket alive waiting for response
  maxPoolSize: 10, // optional: number of connections in pool
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In dev mode, reuse the global connection to prevent hot-reload reconnects
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In prod, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
