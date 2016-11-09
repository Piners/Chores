UPDATE assigned_chores
SET chore_status = false
WHERE assigned_chore_pk = $1 
