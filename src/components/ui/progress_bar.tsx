type Props = {
  label: string;
  value?: number;
  max?: number;
  isLoading?: boolean;
};

export function ProgressBar({ label, value, max, isLoading }: Props) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center justify-between text-sm pb-2">
        {label}
        {value === undefined || max === undefined || isLoading
          ? <div className="bg-zinc-700 animate-pulse h-3 rounded-full w-16" />
          : <div>{value} of {max}</div>}
      </div>
      <div className="rounded-full bg-zinc-100 dark:bg-zinc-300">
        {value === undefined || max === undefined || isLoading
          ? (
            <div className="h-1.5 rounded-full bg-zinc-700 animate-pulse w-full" />
          )
          : (
            <div
              style={{
                width: `${value / max * 100}%`,
              }}
              className="h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-700"
            />
          )}
      </div>
    </div>
  );
}
