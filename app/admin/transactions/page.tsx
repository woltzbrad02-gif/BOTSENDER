'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, CheckCircle, Clock, X } from 'lucide-react';

const transactions = [
  {
    id: 1,
    user: 'John Doe',
    type: 'deposit',
    amount: 1000,
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: 2,
    user: 'Jane Smith',
    type: 'withdrawal',
    amount: 500,
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: 3,
    user: 'Bob Johnson',
    type: 'deposit',
    amount: 2000,
    status: 'completed',
    date: '2024-01-14',
  },
  {
    id: 4,
    user: 'Alice Brown',
    type: 'withdrawal',
    amount: 750,
    status: 'failed',
    date: '2024-01-14',
  },
];

export default function AdminTransactionsPage() {
  const getIcon = (type: string) => {
    return type === 'deposit' ? TrendingUp : TrendingDown;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return X;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/10';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'failed':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-blue-500 bg-blue-500/10';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="p-6 md:p-8 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Transactions</h1>
        <p className="text-muted-foreground">Monitor all platform transactions</p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search transactions..."
          className="flex-1 px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
        />
        <select className="px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-destructive">
          <option>All Types</option>
          <option>Deposit</option>
          <option>Withdrawal</option>
        </select>
        <select className="px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-destructive">
          <option>All Status</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </motion.div>

      {/* Transactions Table */}
      <motion.div variants={itemVariants} className="overflow-x-auto rounded-xl border border-border/50 bg-card/50 backdrop-blur">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => {
              const Icon = getIcon(tx.type);
              const StatusIcon = getStatusIcon(tx.status);
              return (
                <tr key={tx.id} className="border-b border-border/50 hover:bg-accent/5 transition-all">
                  <td className="px-6 py-4">
                    <p className="font-medium">{tx.user}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className="capitalize text-sm">{tx.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold">${tx.amount}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon className="w-4 h-4" />
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(tx.status)}`}>
                        {tx.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
