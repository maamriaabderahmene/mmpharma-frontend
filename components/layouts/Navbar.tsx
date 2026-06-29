import { getOptionalSession } from '@/lib/server/auth/guards';
import { NavbarClient } from './NavbarClient';
import type { SessionPayload } from '@/lib/shared/types/Session';

export async function Navbar() {
  const session: SessionPayload | null = await getOptionalSession();

  return <NavbarClient session={session} />;
}
