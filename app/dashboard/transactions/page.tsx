'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'deposit',
    description: 'Bank Transfer',
    amount: 1000,
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: 2,
    type: 'investment',
    description: 'Professional Plan Investment',
    amount: 500,
    date: '2024-01-14',
    status: 'completed',
  },
  {
    id: 3,
    type: 'earning',
    description: 'Investment Returns',
    amount: 120,
    date: '2024-01-13',
    status: 'completed',
  },
  {
    id: 4,
    type: 'deposit',
    description: 'Credit Card',
    amount: 250,
    date: '2024-01-12',
    status: 'completed',
  },
  {
    id: 5,
    type: 'withdrawal',
    description: 'Bank Withdrawal',
    amount: 300,
    date: '2024-01-11',
    status: 'pending',
  },
  {
    id: 6,
    type: 'earning',
    description: 'Referral Bonus',
    amount: 50,
    date: '2024-01-10',
    status: 'completed',
  },
];

export default function TransactionsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'earning':
        return TrendingUp;
      case 'withdrawal':
      case 'investment':
        return TrendingDown;
      default:
        return Wallet;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-500/10';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      default:
        return 'text-red-500 bg-red-500/10';
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'earning':
        return 'text-green-500';
      default:
        return 'text-red-500';
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
        <h1 className="text-4xl font-bold mb-2">Transaction History</h1>
        <p className="text-muted-foreground">View all your deposits, withdrawals, and earnings</p>
      </motion.div>

      {/* Transactions Table */}
      <motion.div variants={itemVariants} className="overflow-x-auto rounded-xl border border-border/50 bg-card/50 backdrop-blur">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Description</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              const Icon = getIcon(transaction.type);
              return (
                <tr key={transaction.id} className="border-b border-border/50 hover:bg-accent/5 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground capitalize">{transaction.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`font-semibold ${getAmountColor(transaction.type)}`}>
                      {transaction.type === 'deposit' || transaction.type === 'earning' ? '+' : '-'}${transaction.amount}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination */}
      <motion.div variants={itemVariants} className="mt-6 flex items-center justify-center gap-2">
        <button className="px-4 py-2 rounded-lg border border-border/50 hover:bg-accent/10 transition-all disabled:opacity-50">
          Previous
        </button>
        <div className="flex gap-1">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg transition-all ${
                page === 1
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border/50 hover:bg-accent/10'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 rounded-lg border border-border/50 hover:bg-accent/10 transition-all">
          Next
        </button>
      </motion.div>
    </motion.div>
  );
}
