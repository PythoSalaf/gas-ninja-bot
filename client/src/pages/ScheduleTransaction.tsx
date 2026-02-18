import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCurrentGasPrice } from "@/lib/mock-data";
import { Send, Fuel, Clock, TrendingDown, CheckCircle2, Loader2, Radio, CalendarClock } from "lucide-react";

const statusSteps = [
  { label: "Scheduled", icon: CalendarClock },
  { label: "Monitoring", icon: Radio },
  { label: "Executing", icon: Loader2 },
  { label: "Completed", icon: CheckCircle2 },
];

const ScheduleTransaction = () => {
  const [targetAddress, setTargetAddress] = useState("");
  const [calldata, setCalldata] = useState("");
  const [value, setValue] = useState("");
  const currentGas = getCurrentGasPrice();
  const predictedOptimal = parseFloat((currentGas * 0.72).toFixed(2));
  const estimatedSavings = parseFloat((currentGas - predictedOptimal).toFixed(2));

  // Demo pending txs
  const pendingTxs = [
    { id: "TX-0033", step: 1, target: "0x742d...8f44", submitted: "2m ago" },
    { id: "TX-0034", step: 2, target: "0x1a3b...9e21", submitted: "8m ago" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedule Transaction</h2>
          <p className="text-sm text-muted-foreground">
            Submit a transaction to the agent's predictive execution queue
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form */}
          <Card className="border-border bg-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">New Scheduled Transaction</CardTitle>
              <CardDescription>The agent will monitor gas and execute at the optimal time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target">Target Address</Label>
                <Input
                  id="target"
                  placeholder="0x..."
                  value={targetAddress}
                  onChange={(e) => setTargetAddress(e.target.value)}
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calldata">Calldata (hex)</Label>
                <Textarea
                  id="calldata"
                  placeholder="0x..."
                  value={calldata}
                  onChange={(e) => setCalldata(e.target.value)}
                  className="font-mono min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value (BNB)</Label>
                <Input
                  id="value"
                  placeholder="0.0"
                  type="number"
                  step="0.0001"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <Button className="w-full gap-2" size="lg">
                <Send className="h-4 w-4" />
                Schedule Transaction
              </Button>
            </CardContent>
          </Card>

          {/* Gas info sidebar */}
          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Current Gas</span>
                </div>
                <p className="text-3xl font-bold">{currentGas} <span className="text-sm font-normal text-muted-foreground">Gwei</span></p>
                
                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" /> Predicted Optimal
                    </span>
                    <span className="text-sm font-semibold text-primary">{predictedOptimal} Gwei</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Est. Wait
                    </span>
                    <span className="text-sm font-semibold">~3-8 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Est. Savings</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
                      ~{estimatedSavings} Gwei ({((estimatedSavings / currentGas) * 100).toFixed(0)}%)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending txs tracker */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Pending Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingTxs.map((tx) => (
                  <div key={tx.id} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-medium">{tx.id}</span>
                      <span className="text-muted-foreground">{tx.submitted}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {statusSteps.map((step, i) => (
                        <div key={step.label} className="flex items-center">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              i <= tx.step
                                ? "bg-primary/20 text-primary"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            <step.icon className={`h-3 w-3 ${i === tx.step ? "animate-pulse-glow" : ""}`} />
                          </div>
                          {i < statusSteps.length - 1 && (
                            <div
                              className={`h-0.5 w-4 ${
                                i < tx.step ? "bg-primary" : "bg-border"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {statusSteps[tx.step].label} • {tx.target}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ScheduleTransaction;
