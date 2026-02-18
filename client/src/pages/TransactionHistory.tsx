import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { generateTransactions, type Transaction } from "@/lib/mock-data";
import { ExternalLink, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 8;

const TransactionHistory = () => {
  const allTx = useMemo(() => generateTransactions(32), []);
  const [sortKey, setSortKey] = useState<keyof Transaction>("timestamp");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    return [...allTx].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [allTx, sortKey, sortDir]);

  const paged = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  const toggleSort = (key: keyof Transaction) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const statusColor = (s: string) => {
    if (s === "completed") return "bg-primary/20 text-primary border-primary/30";
    if (s === "executing") return "bg-chart-cyan/20 text-chart-cyan border-chart-cyan/30";
    if (s === "pending") return "bg-chart-yellow/20 text-chart-yellow border-chart-yellow/30";
    return "bg-destructive/20 text-destructive border-destructive/30";
  };

  const savingsColor = (pct: number) => {
    if (pct >= 30) return "text-primary";
    if (pct >= 15) return "text-chart-yellow";
    return "text-chart-orange";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Transaction History</h2>
          <p className="text-sm text-muted-foreground">All optimized transactions with on-chain verification</p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {[
                    { key: "id", label: "Tx ID" },
                    { key: "submittedGas", label: "Submitted Gas" },
                    { key: "executedGas", label: "Executed Gas" },
                    { key: "gasSaved", label: "Saved (Gwei)" },
                    { key: "savingsPercent", label: "Savings %" },
                    { key: "waitTime", label: "Wait Time" },
                    { key: "status", label: "Status" },
                    { key: "txHash", label: "Tx Hash" },
                  ].map(({ key, label }) => (
                    <TableHead key={key}>
                      <button
                        className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider"
                        onClick={() => toggleSort(key as keyof Transaction)}
                      >
                        {label}
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                    <TableCell className="font-mono text-sm">{tx.submittedGas} Gwei</TableCell>
                    <TableCell className="font-mono text-sm">{tx.executedGas} Gwei</TableCell>
                    <TableCell className={`font-mono text-sm font-semibold ${savingsColor(tx.savingsPercent)}`}>
                      {tx.gasSaved}
                    </TableCell>
                    <TableCell className={`font-mono text-sm font-semibold ${savingsColor(tx.savingsPercent)}`}>
                      {tx.savingsPercent}%
                    </TableCell>
                    <TableCell className="text-sm">{Math.floor(tx.waitTime / 60)}m {tx.waitTime % 60}s</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${statusColor(tx.status)}`}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://bscscan.com/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-mono text-accent hover:underline"
                      >
                        {tx.txHash.slice(0, 8)}...{tx.txHash.slice(-6)}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <span className="text-xs text-muted-foreground">
              Page {page + 1} of {totalPages} • {sorted.length} transactions
            </span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TransactionHistory;
