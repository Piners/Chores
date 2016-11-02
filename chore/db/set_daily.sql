UPDATE assigned_chores
SET chore_status = FALSE
WHERE chore_status = TRUE AND chore_daily = TRUE;
