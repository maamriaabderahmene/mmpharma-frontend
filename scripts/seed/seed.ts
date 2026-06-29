import { connectDB, disconnectDB } from '@/lib/server/db/connection';
import { seedProducts } from './products';
import { seedUsers } from './users';
import { seedCategories } from './categories';

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  MM Pharma — Seed Script');
  console.log('═══════════════════════════════════════════\n');

  try {
    await connectDB();

    console.log('▶ Seeding product ranges...\n');
    await seedCategories();

    console.log('▶ Seeding products...\n');
    await seedProducts();

    console.log('▶ Seeding users...\n');
    await seedUsers();

    console.log('═══════════════════════════════════════════');
    console.log('  ✓ All seeders completed successfully');
    console.log('═══════════════════════════════════════════');
  } catch (err) {
    console.error('\n✗ Seed failed:', err);
    process.exit(1);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
}

main();
