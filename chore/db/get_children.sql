SELECT * FROM users
WHERE user_household = $1 AND user_admin = false;
