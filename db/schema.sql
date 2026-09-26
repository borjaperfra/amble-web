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

-- Anonymous, aggregated counts: no cookies, no identifiers, no IPs. One row per
-- day, event and stage; the beacon only ever increments a number.
create table if not exists site_counts (
  day    date not null,
  event  text not null check (event in ('view', 'stage', 'join')),
  stage  text not null default '',
  locale text not null check (locale in ('en', 'es')),
  n      integer not null default 0,
  primary key (day, event, stage, locale)
);
