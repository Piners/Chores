UPDATE users
SET user_banner_image = $1
WHERE user_household = $2 AND user_admin = true;
