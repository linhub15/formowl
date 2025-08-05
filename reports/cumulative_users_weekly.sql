WITH weekly_signups AS (
  SELECT
    DATE_TRUNC('week', created_at) AS week,
    COUNT(*) AS users_this_week
  FROM "user"
  GROUP BY 1
),
cumulative AS (
  SELECT
    week,
    users_this_week,
    SUM(users_this_week) OVER (ORDER BY week) AS cumulative_users
  FROM weekly_signups
)
SELECT * FROM cumulative
ORDER BY week;
