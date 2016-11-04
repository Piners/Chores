update users
set user_email = $1
where user_id_pk = $2;
