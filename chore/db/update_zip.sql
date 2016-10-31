UPDATE users
SET zip = $1
WHERE user_household = $2;
