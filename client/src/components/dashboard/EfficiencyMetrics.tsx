import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight, Minus, Target, Clock, Gauge, TrendingUp } from "lucide-react";
import { getAgentMetrics } from "@/lib/mock-data";

export function EfficiencyMetrics() {
  const m = getAgentMetrics();

  const trendIcon = {
    up: <ArrowUpRight className="h-4 w-4 text-primary" />,
    down: <ArrowDownRight className="h-4 w-4 text-destructive" />,
    stable: <Minus className="h-4 w-4 text-muted-foreground" />,
  };

  const items = [
    {
      label: "Prediction Accuracy",
      value: `${m.predictionAccuracy}%`,
      progress: m.predictionAccuracy,
      icon: Target,
      trend: m.predictionTrend,
    },
    {
      label: "Avg Wait Time",
      value: `${Math.floor(m.avgWaitTime / 60)}m ${m.avgWaitTime % 60}s`,
      progress: Math.min(100, (m.avgWaitTime / 600) * 100),
      icon: Clock,
      trend: "stable" as const,
    },
    {
      label: "Execution Efficiency",
      value: `${m.executionEfficiency}%`,
      progress: m.executionEfficiency,
      icon: Gauge,
      trend: "up" as const,
    },
    {
      label: "ROI",
      value: `${m.roi}%`,
      progress: Math.min(100, m.roi / 10),
      icon: TrendingUp,
      trend: "up" as const,
    },
  ];

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Efficiency Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold">{item.value}</span>
                {trendIcon[item.trend]}
              </div>
            </div>
            <Progress value={item.progress} className="h-1.5" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
