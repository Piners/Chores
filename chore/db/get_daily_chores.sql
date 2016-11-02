SELECT * FROM assigned_chores
WHERE user_id_fk = $1 AND chore_daily = true;
