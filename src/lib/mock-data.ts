// Realistic mock data for the Gas Intelligence Agent dashboard

export interface GasDataPoint {
  timestamp: number;
  gasPrice: number;
  ma5: number;
  ma20: number;
  ma50: number;
  isExecution?: boolean;
}

export interface Transaction {
  id: string;
  txHash: string;
  targetAddress: string;
  submittedGas: number;
  executedGas: number;
  gasSaved: number;
  savingsPercent: number;
  waitTime: number; // seconds
  status: "completed" | "pending" | "executing" | "failed";
  timestamp: number;
  value: string;
}

export interface AgentMetrics {
  totalGasSaved: number;
  totalGasSavedUSD: number;
  avgSavingsPercent: number;
  avgSavingsGwei: number;
  bestExecutionDelta: number;
  totalTransactions: number;
  predictionAccuracy: number;
  avgWaitTime: number;
  executionEfficiency: number;
  roi: number;
  predictionTrend: "up" | "down" | "stable";
}

function generateGasHistory(count: number): GasDataPoint[] {
  const now = Date.now();
  const points: GasDataPoint[] = [];
  let baseGas = 5.0;

  for (let i = 0; i < count; i++) {
    const noise = (Math.random() - 0.5) * 2.5;
    const cycle = Math.sin(i / 15) * 1.5 + Math.sin(i / 7) * 0.8;
    baseGas = Math.max(1.5, Math.min(12, baseGas + noise * 0.3 + cycle * 0.1));
    
    points.push({
      timestamp: now - (count - i) * 15000,
      gasPrice: parseFloat(baseGas.toFixed(2)),
      ma5: 0,
      ma20: 0,
      ma50: 0,
    });
  }

  // Calculate moving averages
  for (let i = 0; i < points.length; i++) {
    const slice5 = points.slice(Math.max(0, i - 4), i + 1);
    const slice20 = points.slice(Math.max(0, i - 19), i + 1);
    const slice50 = points.slice(Math.max(0, i - 49), i + 1);
    points[i].ma5 = parseFloat((slice5.reduce((a, b) => a + b.gasPrice, 0) / slice5.length).toFixed(2));
    points[i].ma20 = parseFloat((slice20.reduce((a, b) => a + b.gasPrice, 0) / slice20.length).toFixed(2));
    points[i].ma50 = parseFloat((slice50.reduce((a, b) => a + b.gasPrice, 0) / slice50.length).toFixed(2));
  }

  // Mark some execution points at local minima
  for (let i = 5; i < points.length - 5; i += Math.floor(Math.random() * 20 + 15)) {
    const localMin = points.slice(i - 3, i + 4).reduce((min, p) => p.gasPrice < min.gasPrice ? p : min, points[i]);
    const idx = points.indexOf(localMin);
    if (idx >= 0) points[idx].isExecution = true;
  }

  return points;
}

const txHashes = [
  "0xa1b2c3d4e5f6789012345678901234567890abcd",
  "0xb2c3d4e5f6789012345678901234567890abcde1",
  "0xc3d4e5f6789012345678901234567890abcde1f2",
  "0xd4e5f6789012345678901234567890abcde1f2a3",
  "0xe5f6789012345678901234567890abcde1f2a3b4",
  "0xf6789012345678901234567890abcde1f2a3b4c5",
  "0x789012345678901234567890abcde1f2a3b4c5d6",
  "0x89012345678901234567890abcde1f2a3b4c5d6e7",
  "0x9012345678901234567890abcde1f2a3b4c5d6e7f8",
  "0x012345678901234567890abcde1f2a3b4c5d6e7f89",
];

export function generateTransactions(count: number = 10): Transaction[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const submittedGas = parseFloat((3 + Math.random() * 7).toFixed(2));
    const gasSaved = parseFloat((0.5 + Math.random() * 3).toFixed(2));
    const executedGas = parseFloat((submittedGas - gasSaved).toFixed(2));
    const statuses: Transaction["status"][] = ["completed", "completed", "completed", "completed", "completed", "pending", "executing"];
    return {
      id: `TX-${String(i + 1).padStart(4, "0")}`,
      txHash: txHashes[i % txHashes.length],
      targetAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
      submittedGas,
      executedGas: Math.max(1, executedGas),
      gasSaved,
      savingsPercent: parseFloat(((gasSaved / submittedGas) * 100).toFixed(1)),
      waitTime: Math.floor(30 + Math.random() * 300),
      status: i < count - 2 ? "completed" : statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: now - (count - i) * 3600000,
      value: (Math.random() * 2).toFixed(4),
    };
  });
}

export function getAgentMetrics(): AgentMetrics {
  return {
    totalGasSaved: 47.82,
    totalGasSavedUSD: 14346.00,
    avgSavingsPercent: 31.4,
    avgSavingsGwei: 2.18,
    bestExecutionDelta: 5.73,
    totalTransactions: 156,
    predictionAccuracy: 87.3,
    avgWaitTime: 142,
    executionEfficiency: 92.1,
    roi: 847,
    predictionTrend: "up",
  };
}

export function getGasHistory(range: "1h" | "6h" | "24h" | "7d" = "24h"): GasDataPoint[] {
  const counts = { "1h": 240, "6h": 720, "24h": 1440, "7d": 2016 };
  return generateGasHistory(counts[range]);
}

export function getCurrentGasPrice(): number {
  return parseFloat((3 + Math.random() * 5).toFixed(2));
}
