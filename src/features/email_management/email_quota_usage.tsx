import { useGetEmailQuota } from "./hooks/use_get_email_quota";

export function EmailQuotaProgress() {
  const { data: emailQuota, isLoading } = useGetEmailQuota();

  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-sm pb-2">
        Emails sent
        {!emailQuota || isLoading
          ? <div className="bg-zinc-700 animate-pulse h-3 rounded-full w-16" />
          : <div>{emailQuota.used} of {emailQuota.max}</div>}
      </div>
      <div className="rounded-full bg-zinc-100 dark:bg-zinc-300">
        {!emailQuota || isLoading
          ? (
            <div className="h-1.5 rounded-full bg-zinc-700 animate-pulse w-full" />
          )
          : (
            <div
              style={{
                width: `${emailQuota.used / emailQuota.max * 100}%`,
              }}
              className="h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-700"
            />
          )}
      </div>
    </div>
  );
}
