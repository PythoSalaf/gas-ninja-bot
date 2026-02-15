import { Card, CardContent } from "@/components/ui/card";
import { Fuel, DollarSign, TrendingUp, Zap } from "lucide-react";
import { getAgentMetrics } from "@/lib/mock-data";

const metrics = getAgentMetrics();

const cards = [
  {
    title: "Total Gas Saved",
    value: `${metrics.totalGasSaved} BNB`,
    sub: `≈ $${metrics.totalGasSavedUSD.toLocaleString()}`,
    icon: Fuel,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Avg Savings / Tx",
    value: `${metrics.avgSavingsPercent}%`,
    sub: `${metrics.avgSavingsGwei} Gwei avg`,
    icon: TrendingUp,
    color: "text-chart-cyan",
    bg: "bg-accent/10",
  },
  {
    title: "Best Execution Delta",
    value: `${metrics.bestExecutionDelta} Gwei`,
    sub: "Single best save",
    icon: Zap,
    color: "text-chart-yellow",
    bg: "bg-chart-yellow/10",
  },
  {
    title: "Total Optimized",
    value: metrics.totalTransactions.toString(),
    sub: "Transactions executed",
    icon: DollarSign,
    color: "text-chart-orange",
    bg: "bg-chart-orange/10",
  },
];

export function SavingsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="border-border bg-card">
          <CardContent className="flex items-start gap-4 p-5">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{card.title}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight">{card.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{card.sub}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
