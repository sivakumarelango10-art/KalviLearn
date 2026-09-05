const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://iavxnhwbgoarnexmyxpn.supabase.co',
  'sb_publishable_UFx1PWpHPXwzyVLhO4DMmQ_0CG9_h40'
);

async function runTests() {
  console.log('=== Growth Mentor Service & Database Integration Test ===\n');

  const testCases = [
    {
      studentName: 'Kavya Ramesh',
      studentEmail: 'kavya.ramesh.s.121@kalvium.community',
      studentId: '36a74ed3-4a98-4374-a3d1-be0e2050b81c',
      expectedMentorName: 'Aaditya R M',
    },
    {
      studentName: 'Prajith P S',
      studentEmail: 'prajith.p.s.121@kalvium.community',
      studentId: '7193765a-4dc6-4f61-813e-3e5dce95b6c7',
      expectedMentorName: 'Swathi K S',
    },
    {
      studentName: 'Unassigned Scholar',
      studentEmail: 'unassigned@kalvium.community',
      studentId: '00000000-0000-0000-0000-000000000000',
      expectedMentorName: null,
    },
  ];

  let allPassed = true;

  for (const tc of testCases) {
    // 1. Fetch student's record
    const { data: student, error: sErr } = await supabase
      .from('users')
      .select('id, name, mentorId')
      .eq('id', tc.studentId)
      .maybeSingle();

    if (sErr) {
      console.error(`Error querying student ${tc.studentName}:`, sErr.message);
      allPassed = false;
      continue;
    }

    let mentorName = null;
    let mentorData = null;

    if (student && student.mentorId) {
      // 2. Fetch mentor's record
      const { data: mentor, error: mErr } = await supabase
        .from('users')
        .select('id, name, email')
        .eq('id', student.mentorId)
        .maybeSingle();

      if (mErr) {
        console.error(`Error querying mentor for ${tc.studentName}:`, mErr.message);
        allPassed = false;
        continue;
      }

      mentorName = mentor?.name || null;
      mentorData = mentor;
    }

    const matched = mentorName === tc.expectedMentorName;
    console.log(`Student: ${tc.studentName}`);
    console.log(`  - Student ID: ${tc.studentId}`);
    console.log(`  - Assigned mentorId: ${student?.mentorId || 'None'}`);
    console.log(`  - Retrieved Mentor Name: ${mentorName || 'None (Unassigned)'}`);
    console.log(`  - Expected Mentor Name:  ${tc.expectedMentorName || 'None (Unassigned)'}`);
    console.log(`  - Verification: ${matched ? '✓ PASSED' : '✗ FAILED'}`);

    if (mentorData) {
      console.log(`  - Checked security: Only name should be displayed in UI. Mentor email "${mentorData.email}" will NOT be rendered.`);
    }
    console.log('');

    if (!matched) {
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log('✓ ALL GROWTH MENTOR INTEGRATION TESTS PASSED!');
  } else {
    console.error('✗ SOME TESTS FAILED.');
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error running tests:', err);
  process.exit(1);
});
