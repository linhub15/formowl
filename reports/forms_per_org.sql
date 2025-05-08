with form_counts as (
  select
    count(*) as form_count,
    organization_id
  from form
  group by organization_id
)

select
  min(form_count),
  avg(form_count),
  max(form_count)
from form_counts;
