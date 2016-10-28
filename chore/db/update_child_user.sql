UPDATE users
SET user_password = $1,
    user_email = $2,
    user_image = $3,
    user_first_name = $4,
    user_last_name = $5
WHERE user_id_pk = $6
