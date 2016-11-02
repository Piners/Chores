INSERT INTO users
(user_first_name,user_last_name,user_email,user_password,user_image,user_household,user_points_total,user_admin)
VALUES($1,$2,$3,$4,$5,$6,0,false);
