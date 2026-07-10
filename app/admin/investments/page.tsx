'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

const investments = [
  {
    id: 1,
    planName: 'Starter',
    duration: 30,
    rate: 8,
    minAmount: 100,
    maxAmount: 5000,
    active: true,
    totalInvested: '$45,000',
  },
  {
    id: 2,
    planName: 'Professional',
    duration: 60,
    rate: 12,
    minAmount: 5001,
    maxAmount: 50000,
    active: true,
    totalInvested: '$125,000',
  },
  {
    id: 3,
    planName: 'Premium',
    duration: 90,
    rate: 18,
    minAmount: 50001,
    maxAmount: 500000,
    active: true,
    totalInvested: '$320,000',
  },
];

export default function AdminInvestmentsPage() {
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
      <motion.div variants={itemVariants} className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Investment Plans</h1>
          <p className="text-muted-foreground">Manage investment plans and settings</p>
        </div>
        <button className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:opacity-90 transition-all">
          Create Plan
        </button>
      </motion.div>

      {/* Plans Table */}
      <motion.div variants={itemVariants} className="overflow-x-auto rounded-xl border border-border/50 bg-card/50 backdrop-blur">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Plan Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Duration</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Return Rate</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Amount Range</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Total Invested</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment) => (
              <tr key={investment.id} className="border-b border-border/50 hover:bg-accent/5 transition-all">
                <td className="px-6 py-4">
                  <p className="font-semibold">{investment.planName}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm">{investment.duration} days</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-primary">{investment.rate}%</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm">
                    ${investment.minAmount.toLocaleString()} - ${investment.maxAmount.toLocaleString()}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold">{investment.totalInvested}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-accent/20 rounded-lg transition-all text-primary hover:text-primary/80">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-destructive/20 rounded-lg transition-all text-destructive hover:text-destructive/80">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
