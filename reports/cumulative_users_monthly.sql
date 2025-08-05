WITH monthly_users AS (
  SELECT
    DATE_TRUNC('month', created_at) AS month,
    COUNT(*) AS new_users
  FROM "user"
  GROUP BY month
)
SELECT
  TO_CHAR(month, 'YYYY-MM') AS month_year,
  new_users,
  SUM(new_users) OVER (ORDER BY month) AS cumulative_users
FROM monthly_users
ORDER BY month;