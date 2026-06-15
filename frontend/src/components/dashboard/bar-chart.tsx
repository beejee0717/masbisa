type BarChartProps = {
  data: { label: string; value: number }[];
  title: string;
  description?: string;
};

// CSS bar chart — no chart library required for placeholder data
export function BarChart({ data, title, description }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium text-slate-50">{title}</h3>
        {description ? (
          <p className="text-sm text-slate-400">{description}</p>
        ) : null}
      </div>

      <div className="flex h-48 items-end justify-between gap-1.5 sm:gap-2">
        {data.map((item) => {
          const height = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

          return (
            <div
              key={item.label}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div className="relative flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-sky-500/80 transition-all hover:bg-sky-400"
                  style={{ height: `${height}%` }}
                  title={`${item.label}: ${item.value}`}
                />
              </div>
              <span className="text-[10px] text-slate-500 sm:text-xs">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
