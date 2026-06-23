"use client";

import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatCurrency } from "@/lib/calculators";

interface PieChartProps {
  invested: number;
  returns: number;
}

export function InvestmentPieChart({ invested, returns }: PieChartProps) {
  const data = [
    { name: "Principal Invested", value: invested },
    { name: "Returns Earned", value: returns },
  ];
  const COLORS = ["#1e3a8a", "#059669"];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            contentStyle={{
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "12px",
              color: "white",
            }}
          />
          <Legend
            formatter={(value) => <span style={{ color: "#94a3b8", fontSize: "12px" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

interface GrowthChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<Record<string, any>>;
  dataKey?: string;
  investedKey?: string;
}

export function GrowthAreaChart({ data, dataKey = "value", investedKey = "invested" }: GrowthChartProps) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `Y${v}`}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => {
              if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`;
              if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
              if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
              return `₹${v}`;
            }}
          />
          <Tooltip
            formatter={(value, name) => [
              formatCurrency(Number(value)),
              String(name) === dataKey ? "Portfolio Value" : "Amount Invested",
            ]}
            contentStyle={{
              background: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "12px",
              color: "white",
            }}
            labelFormatter={(label) => `Year ${label}`}
          />
          {investedKey && (
            <Area
              type="monotone"
              dataKey={investedKey}
              stroke="#059669"
              strokeWidth={2}
              fill="url(#investedGrad)"
              name={investedKey}
            />
          )}
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#valueGrad)"
            name={dataKey}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
