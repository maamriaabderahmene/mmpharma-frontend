import 'server-only';
import mongoose from 'mongoose';
import { env } from '@/lib/env';

let isConnected = false;
let connectionFailed = false;

export async function connectDB(): Promise<boolean> {
  if (isConnected) return true;
  if (connectionFailed) return false;
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return true;
  }
  try {
    await mongoose.connect(env.MONGO_URI, { dbName: env.MONGO_DB_NAME });
    isConnected = true;
    console.log(`[DB] Connected to MongoDB — db: ${env.MONGO_DB_NAME}`);
    return true;
  } catch (err) {
    console.error('[DB] Connection error:', err);
    connectionFailed = true;
    return false;
  }
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
