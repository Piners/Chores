UPDATE assigned_chores
SET chore_name = $1,
    chore_description = $2,
    chore_value = $3,
    chore_daily = $4,
    chore_weekly = $5,
    chore_monthly = $6
WHERE assigned_chore_pk = $7;
