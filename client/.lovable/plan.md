

# Autonomous Gas Intelligence Agent — Frontend Dashboard

## Overview
A production-grade React + TypeScript Web3 analytics dashboard for your Gas Intelligence Agent on BNB Chain. The dashboard will connect to your deployed smart contract (via ethers.js/viem) and display real-time gas data, predictions, savings, and transaction history.

---

## Page 1: Main Dashboard

### Gas Trend Chart (Hero Section)
- Live gas price graph using Recharts with real-time updates
- Overlay lines for 5, 20, and 50-period moving averages
- Visual markers highlighting agent execution points (green dots at local minima)
- Time range selector (1h, 6h, 24h, 7d)

### Savings Summary Cards
- **Total Gas Saved** — displayed in both BNB and USD
- **Average Savings Per Transaction** — percentage and absolute value
- **Best Execution Delta** — the single best gas saving achieved
- **Total Transactions Optimized** — count of completed executions

### Efficiency Metrics Section
- Prediction accuracy percentage (with trend arrow)
- Average wait time before execution
- Execution efficiency score
- ROI metric (gas saved vs. agent operational cost)

---

## Page 2: Transaction History

### Transaction Table
- Columns: Tx ID, Submitted Gas Price, Executed Gas Price, Gas Saved, Wait Time, Status, Tx Hash
- Tx Hash links to BscScan for on-chain verification
- Sortable and filterable columns
- Pagination for large datasets
- Color-coded savings (green for good saves, yellow for marginal)

---

## Page 3: Schedule Transaction
- Form to submit a new scheduled transaction (target address, calldata, value)
- Shows current gas price and predicted optimal window
- Displays estimated savings range
- Status tracker for pending transactions (Scheduled → Monitoring → Executing → Completed)

---

## Technical Approach
- **Web3 integration**: Use ethers.js or viem to read from your GasOptimizedExecutor contract (you'll provide the ABI and address)
- **Gas data**: Fetch live gas prices from BNB Chain RPC or BSC Gas API
- **State management**: TanStack Query for data fetching with polling intervals
- **Charts**: Recharts for all visualizations
- **Responsive**: Works on desktop and mobile
- **Wallet connection**: Connect wallet button (MetaMask/WalletConnect) for submitting scheduled transactions
- **Design**: Dark theme with green/cyan accent colors for a Web3 analytics feel

---

## What You'll Need to Provide Later
- Deployed contract address and ABI
- BNB Chain RPC endpoint (or we'll use a public one)
- Any API endpoints from your Node.js agent for real-time prediction data

The dashboard will initially use realistic mock data so you can see the full UI immediately, then swap in live data when your backend is ready.

