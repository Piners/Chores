update users
set user_first_name = $1
where user_id_pk = $2;
