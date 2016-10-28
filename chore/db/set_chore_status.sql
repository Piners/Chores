UPDATE assigned_chores
SET chore_status = TRUE
WHERE assigned_chore_pk = $1
RETURNING chore_value,user_id_fk;
