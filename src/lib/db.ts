import postgres from 'postgres';
import { DATABASE_URL } from 'astro:env/server';

let client: postgres.Sql | undefined;

export function db() {
  client ??= postgres(DATABASE_URL, { max: 5 });
  return client;
}
