INSERT INTO assigned_chores
(user_id_fk,user_household_fk,chore_name,chore_description,chore_value,chore_daily,chore_weekly,chore_monthly,chore_status)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,FALSE);
