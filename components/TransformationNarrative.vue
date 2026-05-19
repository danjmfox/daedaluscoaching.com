<template>
  <section class="transformation-narrative content-block" aria-label="Transformation work examples">
    <ul class="transformation-narrative__list">
      <li v-for="(vignette, i) in vignettes" :key="vignette.title" class="transformation-narrative__item">
        <details :open="i === 0" class="transformation-narrative__detail">
          <summary class="transformation-narrative__summary">
            <span class="transformation-narrative__title">{{ vignette.title }}</span>
            <span class="transformation-narrative__lead">{{ vignette.lead }}</span>
          </summary>
          <p class="transformation-narrative__body">{{ vignette.body }}</p>
        </details>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const vignettes = [
  {
    title: 'When the data changed the conversation',
    lead: 'A product organisation in consumer technology, around two hundred engineers, had committed to a high-profile mobile revamp: four months to deliver what senior management estimated would take two years.',
    body: 'The team was already carrying BAU, support, and continuous improvement work. Rather than push harder, the work was to make the trade-offs legible. Throughput data and probabilistic forecasting showed a 1.4% chance of success at current load, and 95% if BAU was reduced significantly. The Product Owner used this to stop having the wrong argument with stakeholders. The mobile revamp shipped a month early.',
  },
  {
    title: 'From troubled to exemplar',
    lead: 'A cross-functional engineering team in a scaling technology organisation had been labelled "troubled" by leadership — failing to deliver, fractured ways of working, high turnover in a short span.',
    body: 'Rather than push for velocity, the intervention was a pause: two weeks of structured experimentation — story slicing, flow games, Kanban design, collaborative practice — replacing the imposed process with something the team understood and owned. One developer described it afterward as "intensely collaborative, without even realising we\'d changed." Within months, other teams were being directed to learn from them. Management were sending Directors and VPs to observe.',
  },
  {
    title: '135 ideas, one clear direction',
    lead: 'A digital job board with several hundred staff needed a 40% improvement in a core acquisition metric, and a new technology leader wanted to make a department-wide impact.',
    body: 'Energy and alignment were low after a difficult period. Rather than prescribe a solution, the work was to create conditions for one to emerge. An Open Space workshop framed the challenge as a shared question and gave over fifty people structured freedom to generate and prioritise ideas. 135 ideas were refined to a top ten. The metric target was hit within six months. By year-end it had been exceeded by a further 20%.',
  },
  {
    title: 'When senior leaders needed to work on themselves',
    lead: 'A large organisation rolling out a five-year strategy had formed a director-level steering group to lead its most significant objective.',
    body: 'Early sessions had gone poorly — low trust, conflicting assumptions, rising tension, no traction. At the CMO\'s request, a two-day offsite was designed and co-facilitated: ground rules, assumption surfacing, shared purpose, planning cadence, and working group formation. The focus was on the group\'s relational system, not just the strategy. People who had been talking past each other were collaborating by the end. One director described it as the best offsite they had attended.',
  },
  {
    title: 'What leadership looks like under pressure',
    lead: 'A software engineering manager, new to a team carrying a high-profile deliverable with director-level sponsorship, had defaulted under pressure to directive control.',
    body: 'The team expected autonomy. Relationships were strained, and someone was at risk of a performance plan. A series of confidential coaching sessions created space for the manager to examine his leadership stance and clarify how he wanted to show up. Relationship alignment work with the team followed. Communication opened, tension dropped, and the manager built tools to navigate similar conditions independently — without the coach in the room.',
  },
]
</script>

<style scoped>
.transformation-narrative {
  padding-top: 0;
}

.transformation-narrative__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.transformation-narrative__item {
  border-top: 1px solid var(--color-border);
}

.transformation-narrative__detail {
  padding-block: var(--space-lg);
}

.transformation-narrative__summary {
  cursor: pointer;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  position: relative;
  padding-right: var(--space-xl);
}

.transformation-narrative__summary::-webkit-details-marker,
.transformation-narrative__summary::marker {
  display: none;
}

.transformation-narrative__summary::after {
  content: '+';
  position: absolute;
  right: 0;
  top: 0;
  font-family: var(--font-family-body);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-light);
  color: var(--color-accent);
  line-height: var(--line-height-snug);
  transition: transform 0.15s ease;
}

.transformation-narrative__detail[open] .transformation-narrative__summary::after {
  content: '−';
}

.transformation-narrative__title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-snug);
  color: var(--color-text-primary);
}

.transformation-narrative__lead {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
}

.transformation-narrative__body {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  margin: var(--space-md) 0 0;
}
</style>
