UPDATE users
SET user_theme = $1
WHERE user_id_pk = $2
RETURNING user_theme;
