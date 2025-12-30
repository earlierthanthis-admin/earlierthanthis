import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const authenticationTypes = [{ name: 'local' }, { name: 'google' }];

// Admin credentials for testing
const testAdmin = {
  email: 'admin@earlierthanthis.com',
  password: 'Admin123!',
  firstName: 'Test',
  lastName: 'Admin',
};

async function main() {
  console.log('Starting database seed...');

  for (const type of authenticationTypes) {
    const existing = await prisma.authenticationType.findUnique({
      where: { name: type.name },
    });

    if (!existing) {
      await prisma.authenticationType.create({
        data: type,
      });
      console.log(`Created authentication type: ${type.name}`);
    } else {
      console.log(`Authentication type already exists: ${type.name}`);
    }
  }

  // Seed test admin
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: testAdmin.email },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(testAdmin.password, 10);
    await prisma.admin.create({
      data: {
        email: testAdmin.email,
        password: hashedPassword,
        firstName: testAdmin.firstName,
        lastName: testAdmin.lastName,
      },
    });
    console.log(`Created test admin: ${testAdmin.email}`);
  } else {
    console.log(`Admin already exists: ${testAdmin.email}`);
  }

  console.log('Database seed completed!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
