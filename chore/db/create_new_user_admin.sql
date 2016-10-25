INSERT INTO users
(user_password,user_email,user_first_name,user_last_name,user_admin)
VALUES($1,$2,$3,$4,TRUE);
