UPDATE users
SET user_points_total = 0
WHERE user_id_pk =$1;
