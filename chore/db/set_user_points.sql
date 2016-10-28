UPDATE users
SET user_points_total = user_points_total + $1
WHERE user_id_pk = $2
