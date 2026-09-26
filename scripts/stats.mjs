// Prints the last 14 days of anonymous counts: node --env-file=.env scripts/stats.mjs
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, { max: 1 });
const rows = await sql`
  select event, stage, sum(n)::int as n from site_counts
  where day > current_date - 14 group by event, stage order by event, n desc
`;
const views = rows.find((r) => r.event === 'view')?.n ?? 0;
console.log(`Last 14 days · ${views} views`);
for (const r of rows.filter((r) => r.event !== 'view')) {
  const pct = views ? Math.round((r.n / views) * 100) : 0;
  console.log(`${(r.event === 'join' ? 'joined' : r.stage).padEnd(10)} ${String(r.n).padStart(6)}  ${pct}%`);
}
await sql.end();
