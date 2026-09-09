const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

async function testStaffComment() {
  const klEnv = fs.readFileSync('e:/KalviCode/.env', 'utf8');
  let tsApiKey = '', klUrl = '', klKey = '';
  for (const line of klEnv.split('\n')) {
    const idx = line.indexOf('=');
    if (idx > 0) {
      const k = line.slice(0, idx).trim();
      const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      if (k === 'TEAMSYNC_API_KEY') tsApiKey = v;
      if (k === 'VITE_SUPABASE_URL') klUrl = v;
      if (k === 'SUPABASE_SERVICE_ROLE_KEY' || (k === 'VITE_SUPABASE_ANON_KEY' && !klKey)) klKey = v;
    }
  }

  console.log('Posting staff comment with origin: TEAMSYNC...');
  const res = await fetch('https://teamsync-fawn.vercel.app/api/v1/tickets/TS-1088/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tsApiKey
    },
    body: JSON.stringify({
      comment: 'Staff update from TeamSync: Root cause fix deployed to production.',
      authorName: 'Sarah Chen (Staff)',
      authorRole: 'STAFF',
      authorEmail: 'sarah.chen@teamsync.io',
      origin: 'TEAMSYNC'
    })
  });

  console.log('HTTP status:', res.status);
  console.log(await res.json());

  console.log('Waiting 5s for TeamSync -> KalviLearn webhook delivery...');
  await new Promise(r => setTimeout(r, 5000));

  const klClient = createClient(klUrl, klKey);
  const { data: report } = await klClient.from('feedback_reports').select('id, public_reference').eq('public_reference', 'FB-1359').single();
  const { data: comments } = await klClient.from('feedback_comments').select('*').eq('feedback_report_id', report.id);

  console.log('Comments found on FB-1359:', comments.length);
  for (const c of comments) {
    console.log({ id: c.id, author_name: c.author_name, content: c.content, teamsync_comment_id: c.teamsync_comment_id });
  }
}

testStaffComment().catch(console.error);
