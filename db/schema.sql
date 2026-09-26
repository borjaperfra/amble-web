-- Waitlist for the Amble closed beta. Idempotent: safe to run on every deploy.
create table if not exists waitlist (
  id               bigserial primary key,
  email            text not null,
  email_normalized text not null unique,
  locale           text not null check (locale in ('en', 'es')),
  consent_at       timestamptz not null default now(),
  token_hash       text,
  token_expires_at timestamptz,
  last_sent_at     timestamptz,
  confirmed_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists waitlist_token_hash_idx on waitlist (token_hash);
