import { supabaseServer } from '../src/server/feedbackAuth'

const REQUIRED_MENTORS = [
  { name: 'Aaditya R M', email: 'aaditya.rm@kalvium.com' },
  { name: 'Swathi K S', email: 'swathi.ks@kalvium.com' },
  { name: 'Sanchita Dutta', email: 'sanchita.dutta@kalvium.com' },
  { name: 'Muvva Supriya', email: 'supriya.muvva@kalvium.com' },
  { name: 'Infanta Carolina Freshale', email: 'infanta.f@kalvium.com' },
  { name: 'Chaitra Alur', email: 'chaitra.alur@kalvium.com' },
  { name: 'Indhu K', email: 'indhu.k@kalvium.com' },
  { name: 'Tulika Suman', email: 'tulika.suman@kalvium.com' },
  { name: 'Mandala Thanuja', email: 'mandala.thanuja@kalvium.com' },
  { name: 'Bhavana R K', email: 'bhavana.r@kalvium.com' },
]

async function auditMentors() {
  console.log('Auditing mentors against required list...')
  const { data: dbMentors, error } = await supabaseServer
    .from('mentors')
    .select('id, name, email, mentor_code, user_id, status')

  if (error) {
    console.error('Failed to query mentors table:', error)
    return
  }

  console.log(`Found ${dbMentors?.length || 0} mentors in database.`)
  const emailMap = new Map((dbMentors || []).map((m: any) => [m.email?.toLowerCase(), m]))

  for (const target of REQUIRED_MENTORS) {
    const found = emailMap.get(target.email.toLowerCase())
    if (found) {
      console.log(`✅ [FOUND] ${target.name} (${target.email}) -> ID: ${found.id}, Code: ${found.mentor_code}, Status: ${found.status}`)
    } else {
      console.log(`❌ [MISSING] ${target.name} (${target.email})`)
    }
  }

  // Also check mentor_students links
  const { data: links } = await supabaseServer
    .from('mentor_students')
    .select('id, mentor_id, student_id, status')
    .eq('status', 'ACTIVE')
  console.log(`Active mentor_student assignments: ${links?.length || 0}`)
}

auditMentors().catch(console.error)
