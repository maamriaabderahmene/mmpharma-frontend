import 'server-only';
import mongoose from 'mongoose';
import { env } from '@/lib/env';

let isConnected = false;
let connectionFailed = false;
let connecting: Promise<boolean> | null = null;

mongoose.set('bufferCommands', false);

export async function connectDB(): Promise<boolean> {
  if (isConnected) return true;
  if (connectionFailed) return false;
  if (connecting) return connecting;
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return true;
  }
  const promise: Promise<boolean> = (async (): Promise<boolean> => {
    try {
      await mongoose.connect(env.MONGO_URI, { dbName: env.MONGO_DB_NAME, serverSelectionTimeoutMS: 2000 });
      isConnected = true;
      console.log(`[DB] Connected to MongoDB — db: ${env.MONGO_DB_NAME}`);
      return true;
    } catch (err) {
      connectionFailed = true;
      console.error('[DB] Connection error:', (err as Error)?.message ?? err);
      return false;
    }
  })();
  connecting = promise;
  return promise;
}

export async function disconnectDB(): Promise<void> {
  if (!isConnected && mongoose.connection.readyState === 0) return;
  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[DB] Disconnected from MongoDB');
  } catch (err) {
    console.error('[DB] Disconnect error:', err);
  }
}
