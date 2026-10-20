create or replace function delete_my_account()
returns void
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid();
begin
  if uid is null then raise exception 'not signed in'; end if;
  delete from storage.objects where bucket_id = 'clips' and (storage.foldername(name))[1] = uid::text;
  delete from places where user_id = uid;
  delete from reports where reporter_id = uid;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function delete_my_account() from public;
grant execute on function delete_my_account() to authenticated;

create or replace function my_place_count()
returns bigint
language sql stable security invoker as $$
  select count(*) from places where user_id = auth.uid()
$$;
