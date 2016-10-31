INSERT INTO users
(user_password,user_email,user_admin,user_household,user_points_total,user_image,user_first_name,user_last_name)
VALUES($1,$2,false,0,$3,$4,$5,$6);
