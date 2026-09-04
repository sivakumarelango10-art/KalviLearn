const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testMentorAccount() {
  console.log('====================================================');
  console.log('TESTING GOOGLE MENTOR ACCOUNT: sivakumarelango10@gmail.com');
  console.log('====================================================\n');

  let allPassed = true;

  // TEST 1: Prisma DB Check
  console.log('--- TEST 1: PostgreSQL Database Record (Prisma) ---');
  try {
    const userInDb = await prisma.user.findUnique({
      where: { email: 'sivakumarelango10@gmail.com' },
    });

    if (!userInDb) {
      console.error('❌ FAIL: sivakumarelango10@gmail.com not found in database.');
      allPassed = false;
    } else {
      console.log('✅ Found user in PostgreSQL:');
      console.log(`   ID:     ${userInDb.id}`);
      console.log(`   Email:  ${userInDb.email}`);
      console.log(`   Role:   ${userInDb.role}`);
      console.log(`   Status: ${userInDb.status}`);
      console.log(`   Name:   ${userInDb.name}`);

      if (userInDb.role !== 'MENTOR') {
        console.error(`❌ FAIL: Expected role MENTOR, got ${userInDb.role}`);
        allPassed = false;
      } else {
        console.log('✅ Role is MENTOR');
      }

      if (userInDb.status !== 'ACTIVE') {
        console.error(`❌ FAIL: Expected status ACTIVE, got ${userInDb.status}`);
        allPassed = false;
      } else {
        console.log('✅ Status is ACTIVE');
      }
    }
  } catch (err) {
    console.error('❌ FAIL: Error querying Prisma DB:', err.message);
    allPassed = false;
  }

  // TEST 2: Supabase Anon Client Query Check (Browser client simulation)
  console.log('\n--- TEST 2: Supabase Anon Client Read Access ---');
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, status, name')
      .ilike('email', 'sivakumarelango10@gmail.com')
      .maybeSingle();

    if (error) {
      console.error('❌ FAIL: Supabase client returned error:', error);
      allPassed = false;
    } else if (!data) {
      console.error('❌ FAIL: No data returned from Supabase users table.');
      allPassed = false;
    } else {
      console.log('✅ Supabase Client returned authorized record:');
      console.log(`   Email:  ${data.email}`);
      console.log(`   Role:   ${data.role}`);
      console.log(`   Status: ${data.status}`);
      console.log(`   Name:   ${data.name}`);
    }
  } catch (err) {
    console.error('❌ FAIL: Exception querying Supabase client:', err.message);
    allPassed = false;
  }

  // TEST 3: Auth Decision Tree Simulation
  console.log('\n--- TEST 3: Auth Decision Tree Simulation ---');
  function simulateAuthDecision(user) {
    if (!user) {
      return { destination: null, accessGranted: false, reason: 'ACCOUNT_NOT_REGISTERED' };
    }
    if (user.status !== 'ACTIVE') {
      return { destination: null, accessGranted: false, reason: 'ACCOUNT_INACTIVE' };
    }
    if (user.role === 'MENTOR' || user.role === 'ADMIN') {
      return { destination: '/mentor', accessGranted: true, role: user.role };
    }
    if (user.role === 'STUDENT') {
      return { destination: '/dashboard', accessGranted: true, role: user.role };
    }
    return { destination: '/dashboard', accessGranted: true, role: user.role };
  }

  const mentorDecision = simulateAuthDecision({
    email: 'sivakumarelango10@gmail.com',
    role: 'MENTOR',
    status: 'ACTIVE',
  });
  console.log('Mentor login result:', mentorDecision);
  if (mentorDecision.destination === '/mentor' && mentorDecision.accessGranted) {
    console.log('✅ Mentor correctly routes to /mentor');
  } else {
    console.error('❌ FAIL: Mentor routing incorrect:', mentorDecision);
    allPassed = false;
  }

  const inactiveDecision = simulateAuthDecision({
    email: 'sivakumarelango10@gmail.com',
    role: 'MENTOR',
    status: 'INACTIVE',
  });
  if (!inactiveDecision.accessGranted && inactiveDecision.reason === 'ACCOUNT_INACTIVE') {
    console.log('✅ Inactive mentor correctly blocked (ACCOUNT_INACTIVE)');
  } else {
    console.error('❌ FAIL: Inactive mentor should be blocked:', inactiveDecision);
    allPassed = false;
  }

  const unregisteredDecision = simulateAuthDecision(null);
  if (!unregisteredDecision.accessGranted && unregisteredDecision.reason === 'ACCOUNT_NOT_REGISTERED') {
    console.log('✅ Unregistered email correctly blocked (ACCOUNT_NOT_REGISTERED)');
  } else {
    console.error('❌ FAIL: Unregistered user should be blocked:', unregisteredDecision);
    allPassed = false;
  }

  const studentDecision = simulateAuthDecision({
    email: 'kavya.ramesh.s.121@kalvium.community',
    role: 'STUDENT',
    status: 'ACTIVE',
  });
  if (studentDecision.destination === '/dashboard' && studentDecision.accessGranted) {
    console.log('✅ Student correctly routes to /dashboard');
  } else {
    console.error('❌ FAIL: Student routing incorrect:', studentDecision);
    allPassed = false;
  }

  // Summary
  console.log('\n====================================================');
  if (allPassed) {
    console.log('🎉 ALL TESTS PASSED FOR MENTOR ACCOUNT sivakumarelango10@gmail.com');
  } else {
    console.log('❌ SOME TESTS FAILED');
  }
  console.log('====================================================');

  await prisma.$disconnect();
}

testMentorAccount();
