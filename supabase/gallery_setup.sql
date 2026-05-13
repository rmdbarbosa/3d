create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  alt text not null,
  image_path text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

drop policy if exists "Public can read published gallery items"
on public.gallery_items;

create policy "Public can read published gallery items"
on public.gallery_items
for select
to anon
using (is_published = true);
