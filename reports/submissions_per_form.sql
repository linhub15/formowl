with submission_counts as (
  select
    count(*) as submission_count
  from form_submission
  group by form_id
)

select
  min(submission_count),
  avg(submission_count),
  max(submission_count)
from submission_counts;
