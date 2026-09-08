const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function main() {
  try {
    const recent = await prisma.$queryRawUnsafe(`
      SELECT id, provider_type, referrer, created_at, updated_at
      FROM auth.flow_state 
      ORDER BY created_at DESC 
      LIMIT 10;
    `);
    console.log('Most recent flow_state entries:');
    console.table(recent);

    // Also check audit_log_entries
    const auditLogs = await prisma.$queryRawUnsafe(`
      SELECT id, payload, created_at
      FROM auth.audit_log_entries
      ORDER BY created_at DESC
      LIMIT 5;
    `);
    console.log('\nRecent audit_log_entries:');
    console.dir(auditLogs, { depth: null });
  } catch (err) {
    console.error('Error querying auth tables:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
