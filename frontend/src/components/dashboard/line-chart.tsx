type LineChartProps = {
  data: { label: string; value: number }[];
  title: string;
  description?: string;
};

// SVG area + line chart for weekly trends
export function LineChart({ data, title, description }: LineChartProps) {
  const width = 400;
  const height = 160;
  const padding = { top: 8, right: 8, bottom: 24, left: 8 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const valueRange = maxValue - minValue || 1;

  const points = data.map((item, index) => {
    const x =
      padding.left + (index / Math.max(data.length - 1, 1)) * chartWidth;
    const y =
      padding.top +
      chartHeight -
      ((item.value - minValue) / valueRange) * chartHeight;
    return { x, y, ...item };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = [
    `M ${points[0]?.x ?? padding.left} ${padding.top + chartHeight}`,
    ...points.map((point) => `L ${point.x} ${point.y}`),
    `L ${points[points.length - 1]?.x ?? padding.left} ${padding.top + chartHeight}`,
    "Z",
  ].join(" ");

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-medium text-slate-50">{title}</h3>
        {description ? (
          <p className="text-sm text-slate-400">{description}</p>
        ) : null}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label={title}
      >
        {/* Gradient fill under the line */}
        <defs>
          <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(56 189 248)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(56 189 248)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#activityGradient)" />
        <path
          d={linePath}
          fill="none"
          stroke="rgb(56 189 248)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((point) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="3.5"
              fill="rgb(56 189 248)"
              stroke="rgb(15 23 42)"
              strokeWidth="2"
            />
            <text
              x={point.x}
              y={height - 4}
              textAnchor="middle"
              className="fill-slate-500 text-[10px]"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
