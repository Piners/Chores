UPDATE users
SET user_password = $1
WHERE user_id_pk = $2
returning user_password, user_id_pk;
