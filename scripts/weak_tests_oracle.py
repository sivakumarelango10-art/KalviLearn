import json
import math

with open('data/imports/all_480_questions.json', 'r', encoding='utf-8') as f:
    b480 = json.load(f)
q_map = {q['id']: q for q in b480['questions']}

with open('docs/question-audit/question_decisions_compact.json', 'r', encoding='utf-8') as f:
    decisions = json.load(f)
weak480 = decisions.get('weak480', {})

print(f"Loaded {len(weak480)} weak questions.")
