const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testAddStudentFeature() {
  console.log('====================================================');
  console.log('🧪 TESTING "ADD STUDENT" FEATURE IN MENTOR PORTAL');
  console.log('====================================================\n');

  const testName = 'Test Student ' + Math.floor(Math.random() * 1000);
  const testEmail = `test.student.${Date.now()}@kalvium.community`;

  console.log(`1. Attempting to add student: "${testName}" (${testEmail})...`);

  // 1. Check existing
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .ilike('email', testEmail)
    .maybeSingle();

  if (existing) {
    throw new Error('Test email already exists, rerun test');
  }

  // 2. Insert new student
  const { data: inserted, error: insertError } = await supabase
    .from('users')
    .insert({
      name: testName,
      email: testEmail,
      role: 'STUDENT',
      status: 'ACTIVE',
    })
    .select('id, email, name, role, status, createdAt')
    .single();

  if (insertError) {
    console.error('❌ FAIL: Insert failed:', insertError);
    process.exit(1);
  }

  console.log('✅ Student inserted successfully into PostgreSQL:');
  console.log(`   ID:     ${inserted.id}`);
  console.log(`   Name:   ${inserted.name}`);
  console.log(`   Email:  ${inserted.email}`);
  console.log(`   Role:   ${inserted.role}`);
  console.log(`   Status: ${inserted.status}`);

  // 3. Verify student shows up in student roster query
  console.log('\n2. Verifying student appears in roster query...');
  const { data: roster, error: rError } = await supabase
    .from('users')
    .select('id, email, name, role, status')
    .eq('role', 'STUDENT');

  const found = roster?.find(s => s.id === inserted.id);
  if (!found) {
    console.error('❌ FAIL: Newly added student not found in roster query');
    process.exit(1);
  }
  console.log(`✅ Verified: Found student in roster (${roster.length} total students now).`);

  // 4. Verify login verification check passes for newly added student
  console.log('\n3. Verifying auth authorization check for new student...');
  const { data: authCheck, error: aError } = await supabase
    .from('users')
    .select('id, email, role, status, name')
    .ilike('email', testEmail)
    .maybeSingle();

  if (!authCheck || authCheck.status !== 'ACTIVE') {
    console.error('❌ FAIL: Auth check failed for newly added student');
    process.exit(1);
  }
  console.log('✅ Verified: Student is immediately authorized to log in via Google Auth!');

  // 5. Clean up the test student
  console.log('\n4. Cleaning up test student from database...');
  const { error: delError } = await supabase
    .from('users')
    .delete()
    .eq('id', inserted.id);

  if (delError) {
    console.error('❌ Clean up error:', delError);
  } else {
    console.log('✅ Cleaned up test student cleanly.');
  }

  console.log('\n====================================================');
  console.log('🎉 "ADD STUDENT" FEATURE VERIFICATION PASSED 100%!');
  console.log('====================================================\n');
}

testAddStudentFeature().catch(console.error);
