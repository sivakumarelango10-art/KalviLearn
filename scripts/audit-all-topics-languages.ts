import { getAllLearnTopics, getLearnQuestionsByTopic } from '../src/data/learn/coding/index'
import { executeQuestion } from '../src/server/executeService'

process.env.KALVI_NATIVE_JUDGE = '0'

async function audit() {
  const allTopics = getAllLearnTopics()
  console.log(`Auditing 24 topics on LOCAL ENGINE (Java and C++)...`)

  for (const topic of allTopics) {
    console.log(`\n========================================`)
    console.log(`Topic: ${topic.id} (${topic.title})`)
    console.log(`========================================`)
    const qs = getLearnQuestionsByTopic(topic.id).slice(0, 3)

    for (const q of qs) {
      console.log(`Question: ${q.slug}`)
      console.log(`  Input: ${q.visibleTests[0]?.input} -> Expected: ${q.visibleTests[0]?.expectedOutput}`)
      console.log(`  isPythonOnly: ${q.isPythonOnly}`)
    }
  }
}

audit()
