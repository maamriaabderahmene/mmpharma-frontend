import 'server-only';
import { connectDB } from '@/lib/server/db/connection';
import UserModel from '@/lib/server/db/models/User';

const users = [
  {
    email: 'admin@mmpharma.ma',
    name: 'Admin MM Pharma',
    role: 99,
    status: 'active' as const,
    company: 'MM Pharma',
    phone: '+212 5XX XX XX XX',
    locale: 'fr-MA',
    preferences: { theme: 'light' as const, newsletter: false },
    stats: { orderCount: 0, commentCount: 0 },
  },
  {
    email: 'client@test.ma',
    name: 'Client Test',
    role: 20,
    status: 'active' as const,
    company: 'Pharmacie Test',
    phone: '+212 6XX XX XX XX',
    locale: 'fr-MA',
    preferences: { theme: 'light' as const, newsletter: true },
    stats: { orderCount: 0, commentCount: 0 },
  },
];

export async function seedUsers(): Promise<number> {
  await connectDB();

  let count = 0;

  for (const data of users) {
    try {
      await UserModel.findOneAndUpdate(
        { email: data.email },
        { ...data },
        { upsert: true, new: true }
      );
      count++;
      console.log(`  [USER] ✓ ${data.email} — ${data.name}`);
    } catch (err) {
      console.error(`  [USER] ✗ ${data.email} — ${err}`);
    }
  }

  console.log(`\n[USER] Seeded ${count}/${users.length} users\n`);
  return count;
}
