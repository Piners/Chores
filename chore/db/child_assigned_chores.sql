SELECT user_first_name,user_last_name,user_image,user_points_total,chore_name,
chore_description,chore_value,chore_daily,chore_weekly,
chore_monthly,chore_status assigned_chore_pk FROM users
JOIN assigned_chores ON users.user_id_pk = assigned_chores.user_id_fk
WHERE user_id_pk = $1 AND chore_status = false;
