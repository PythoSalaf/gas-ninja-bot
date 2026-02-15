import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter, ScatterChart,
  ComposedChart, Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getGasHistory, type GasDataPoint } from "@/lib/mock-data";
import { TrendingDown } from "lucide-react";

const timeRanges = ["1h", "6h", "24h", "7d"] as const;

export function GasTrendChart() {
  const [range, setRange] = useState<"1h" | "6h" | "24h" | "7d">("24h");
  const data = useMemo(() => getGasHistory(range), [range]);

  // Downsample for performance
  const step = Math.max(1, Math.floor(data.length / 200));
  const chartData = data.filter((_, i) => i % step === 0 || data[i]?.isExecution);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return range === "7d"
      ? d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
      : d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Card className="border-border bg-card glow-green">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Gas Price Trend</CardTitle>
        </div>
        <div className="flex gap-1">
          {timeRanges.map((r) => (
            <Button
              key={r}
              variant={range === r ? "default" : "ghost"}
              size="sm"
              className="h-7 px-2.5 text-xs"
              onClick={() => setRange(r)}
            >
              {r}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="gasGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 30%, 18%)" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatTime}
                stroke="hsl(215, 20%, 55%)"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(215, 20%, 55%)"
                fontSize={11}
                tickLine={false}
                label={{ value: "Gwei", angle: -90, position: "insideLeft", style: { fill: "hsl(215, 20%, 55%)" } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(220, 30%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelFormatter={formatTime}
                formatter={(value: number, name: string) => [
                  `${value} Gwei`,
                  name === "gasPrice" ? "Gas Price" : name.toUpperCase(),
                ]}
              />
              <Area
                type="monotone"
                dataKey="gasPrice"
                fill="url(#gasGradient)"
                stroke="hsl(160, 84%, 39%)"
                strokeWidth={2}
                dot={false}
                name="gasPrice"
              />
              <Line type="monotone" dataKey="ma5" stroke="hsl(185, 80%, 45%)" strokeWidth={1} dot={false} strokeDasharray="4 2" name="ma5" />
              <Line type="monotone" dataKey="ma20" stroke="hsl(45, 93%, 58%)" strokeWidth={1} dot={false} strokeDasharray="6 3" name="ma20" />
              <Line type="monotone" dataKey="ma50" stroke="hsl(25, 95%, 53%)" strokeWidth={1} dot={false} strokeDasharray="8 4" name="ma50" />
              <Scatter
                dataKey="gasPrice"
                data={chartData.filter((d) => d.isExecution)}
                fill="hsl(160, 84%, 39%)"
                shape={(props: any) => {
                  if (!props.payload?.isExecution) return null;
                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={5}
                      fill="hsl(160, 84%, 39%)"
                      stroke="hsl(160, 84%, 60%)"
                      strokeWidth={2}
                    />
                  );
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-primary inline-block rounded" /> Gas Price</span>
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-chart-cyan inline-block rounded border-dashed" /> MA-5</span>
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-chart-yellow inline-block rounded" /> MA-20</span>
          <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-chart-orange inline-block rounded" /> MA-50</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary inline-block" /> Execution</span>
        </div>
      </CardContent>
    </Card>
  );
}
