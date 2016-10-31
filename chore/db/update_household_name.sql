UPDATE users
SET user_household = $1
WHERE user_household = $2;
