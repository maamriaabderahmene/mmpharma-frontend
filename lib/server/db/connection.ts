import 'server-only';
import mongoose from 'mongoose';
import { env } from '@/lib/env';

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected) return;
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  try {
    await mongoose.connect(env.MONGO_URI, { dbName: env.MONGO_DB_NAME });
    isConnected = true;
    console.log(`[DB] Connected to MongoDB — db: ${env.MONGO_DB_NAME}`);
  } catch (err) {
    console.error('[DB] Connection error:', err);
    throw err;
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
