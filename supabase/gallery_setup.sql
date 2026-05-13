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

create table if not exists public.gallery_item_images (
  id uuid primary key default gen_random_uuid(),
  gallery_item_id uuid not null references public.gallery_items(id) on delete cascade,
  image_path text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;
alter table public.gallery_item_images enable row level security;

insert into public.gallery_item_images (
  gallery_item_id,
  image_path,
  sort_order,
  created_at
)
select
  gallery_items.id,
  gallery_items.image_path,
  0,
  gallery_items.created_at
from public.gallery_items
where not exists (
  select 1
  from public.gallery_item_images
  where gallery_item_images.gallery_item_id = gallery_items.id
);

drop policy if exists "Public can read published gallery items"
on public.gallery_items;

create policy "Public can read published gallery items"
on public.gallery_items
for select
to anon
using (is_published = true);

drop policy if exists "Public can read published gallery item images"
on public.gallery_item_images;

create policy "Public can read published gallery item images"
on public.gallery_item_images
for select
to anon
using (
  exists (
    select 1
    from public.gallery_items
    where gallery_items.id = gallery_item_images.gallery_item_id
      and gallery_items.is_published = true
  )
);
