"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  new: "#D2151E",
  contacted: "#121117",
  quoted: "#7C2D12",
  accepted: "#15803D",
  scheduled: "#1E40AF",
  completed: "#999999",
  declined: "#CCCCCC",
};

export function ServiceBarChart({ data }: { data: { name: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "#666666" }}
          interval={0}
          angle={-25}
          textAnchor="end"
          height={70}
        />
        <YAxis tick={{ fontSize: 11, fill: "#666666" }} allowDecimals={false} />
        <Tooltip
          cursor={{ fill: "#F3F4F6" }}
          contentStyle={{
            border: "1px solid #DDDDDD",
            borderRadius: 0,
            fontSize: 13,
            fontFamily: "var(--font-public-sans), sans-serif",
          }}
        />
        <Bar dataKey="count" fill="#D2151E" maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function StatusPieChart({ data }: { data: { status: string; count: number }[] }) {
  const chartData = data.map((d) => ({
    name: d.status,
    value: d.count,
    color: STATUS_COLORS[d.status] ?? "#999999",
  }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={45}
          paddingAngle={2}
        >
          {chartData.map((entry, idx) => (
            <Cell key={idx} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            border: "1px solid #DDDDDD",
            borderRadius: 0,
            fontSize: 13,
            fontFamily: "var(--font-public-sans), sans-serif",
          }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-public-sans), sans-serif" }}
          iconType="square"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
