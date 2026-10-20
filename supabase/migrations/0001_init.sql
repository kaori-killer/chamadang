create extension if not exists postgis;

create table places (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  location geography(point, 4326) not null,
  name text check (char_length(name) <= 16),
  tags text[] not null default '{}' check (coalesce(array_length(tags, 1), 0) <= 5),
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  address_short text,
  address_full text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index places_location_idx on places using gist (location);
create index places_user_idx on places (user_id);

create table clips (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references places on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  video_path text not null,
  poster_path text not null,
  duration_ms int not null default 1500,
  tea text check (char_length(tea) <= 10),
  note text check (char_length(note) <= 100),
  source text not null default 'camera' check (source in ('camera', 'gallery')),
  recorded_at timestamptz not null default now()
);
create index clips_place_idx on clips (place_id, recorded_at desc);

create table reports (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references places on delete cascade,
  reporter_id uuid not null references auth.users on delete cascade,
  reason text not null,
  created_at timestamptz not null default now(),
  unique (place_id, reporter_id)
);

alter table places enable row level security;
alter table clips enable row level security;
alter table reports enable row level security;

create policy "places read" on places for select
  using (visibility = 'public' or user_id = auth.uid());
create policy "places write own" on places for insert with check (user_id = auth.uid());
create policy "places update own" on places for update using (user_id = auth.uid());
create policy "places delete own" on places for delete using (user_id = auth.uid());

create policy "clips read" on clips for select
  using (exists (select 1 from places p where p.id = clips.place_id and (p.visibility = 'public' or p.user_id = auth.uid())));
create policy "clips write own" on clips for insert with check (user_id = auth.uid());
create policy "clips delete own" on clips for delete using (user_id = auth.uid());

create policy "reports insert" on reports for insert with check (reporter_id = auth.uid());
create policy "reports read own" on reports for select using (reporter_id = auth.uid());

create or replace function places_in_bounds(
  sw_lat double precision, sw_lng double precision,
  ne_lat double precision, ne_lng double precision,
  mode text default 'all'
)
returns table (
  id uuid, user_id uuid, lat double precision, lng double precision,
  name text, tags text[], visibility text, address_short text,
  clip_count bigint, latest_poster text, latest_recorded_at timestamptz, is_mine boolean
)
language sql stable security invoker as $$
  select
    p.id, p.user_id,
    st_y(p.location::geometry), st_x(p.location::geometry),
    p.name, p.tags, p.visibility, p.address_short,
    count(c.id), 
    (select poster_path from clips where place_id = p.id order by recorded_at desc limit 1),
    max(c.recorded_at),
    p.user_id = auth.uid()
  from places p
  left join clips c on c.place_id = p.id
  where p.location && st_makeenvelope(sw_lng, sw_lat, ne_lng, ne_lat, 4326)::geography
    and (mode <> 'mine' or p.user_id = auth.uid())
    and not exists (select 1 from reports r where r.place_id = p.id and r.reporter_id = auth.uid())
  group by p.id
$$;

create or replace function nearby_own_place(lat double precision, lng double precision, meters double precision default 20)
returns table (id uuid, name text, lat double precision, lng double precision, latest_poster text)
language sql stable security invoker as $$
  select p.id, p.name, st_y(p.location::geometry), st_x(p.location::geometry),
    (select poster_path from clips where place_id = p.id order by recorded_at desc limit 1)
  from places p
  where p.user_id = auth.uid()
    and st_dwithin(p.location, st_setsrid(st_makepoint(lng, lat), 4326)::geography, meters)
  order by p.location <-> st_setsrid(st_makepoint(lng, lat), 4326)::geography
  limit 1
$$;

insert into storage.buckets (id, name, public) values ('clips', 'clips', true)
on conflict do nothing;

create policy "clips storage read" on storage.objects for select using (bucket_id = 'clips');
create policy "clips storage write own" on storage.objects for insert
  with check (bucket_id = 'clips' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "clips storage delete own" on storage.objects for delete
  using (bucket_id = 'clips' and (storage.foldername(name))[1] = auth.uid()::text);
