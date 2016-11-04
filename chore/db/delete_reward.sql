DELETE FROM reward
WHERE user_id_fk = $1 AND reward_id_pk = $2
