import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GasTrendChart } from "@/components/dashboard/GasTrendChart";
import { SavingsCards } from "@/components/dashboard/SavingsCards";
import { EfficiencyMetrics } from "@/components/dashboard/EfficiencyMetrics";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agent Dashboard</h2>
          <p className="text-sm text-muted-foreground">
            Real-time gas intelligence and autonomous execution analytics on BNB Chain
          </p>
        </div>
        <SavingsCards />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <GasTrendChart />
          </div>
          <EfficiencyMetrics />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
