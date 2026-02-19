import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TransactionHistory from "./pages/TransactionHistory";
import ScheduleTransaction from "./pages/ScheduleTransaction";
import NotFound from "./pages/NotFound";
import { PrivyProvider } from "@privy-io/react-auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PrivyProvider appId="cmltf2k40006s0cjv1ku8ackg">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/schedule" element={<ScheduleTransaction />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PrivyProvider>
  </QueryClientProvider>
);

export default App;
