'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, DollarSign, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', users: 400, deposits: 2400, earnings: 1200 },
  { month: 'Feb', users: 600, deposits: 2210, earnings: 1320 },
  { month: 'Mar', users: 800, deposits: 2290, earnings: 1440 },
  { month: 'Apr', users: 1200, deposits: 2000, earnings: 1560 },
  { month: 'May', users: 1400, deposits: 2181, earnings: 1680 },
  { month: 'Jun', users: 1800, deposits: 2500, earnings: 1800 },
];

export default function AdminDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const stats = [
    { icon: Users, label: 'Total Users', value: '1,843', change: '+12.5%' },
    { icon: DollarSign, label: 'Total Deposits', value: '$2.5M', change: '+8.2%' },
    { icon: TrendingUp, label: 'Total Earnings', value: '$450K', change: '+15.3%' },
    { icon: AlertCircle, label: 'Pending Withdrawals', value: '24', change: '-5.1%' },
  ];

  return (
    <motion.div
      className="p-6 md:p-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur hover:border-destructive/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-destructive" />
                </div>
                <span className="text-sm font-medium text-green-500">{stat.change}</span>
              </div>
              <p className="text-muted-foreground text-sm mt-4">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Growth Chart */}
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
          <h2 className="text-xl font-bold mb-6">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(239, 68, 68, 0.1)" />
              <XAxis stroke="rgba(160, 160, 160, 0.5)" />
              <YAxis stroke="rgba(160, 160, 160, 0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(26, 26, 46, 0.8)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="users" stroke="#ef4444" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
          <h2 className="text-xl font-bold mb-6">Revenue Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(239, 68, 68, 0.1)" />
              <XAxis stroke="rgba(160, 160, 160, 0.5)" />
              <YAxis stroke="rgba(160, 160, 160, 0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(26, 26, 46, 0.8)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="earnings" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
        <Link
          href="/admin/users"
          className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-destructive/10 to-destructive/5 backdrop-blur hover:border-destructive/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Manage Users</h3>
              <p className="text-sm text-muted-foreground">View and manage user accounts</p>
            </div>
            <ArrowRight className="w-5 h-5 text-destructive group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/transactions"
          className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 backdrop-blur hover:border-yellow-500/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Transactions</h3>
              <p className="text-sm text-muted-foreground">View all platform transactions</p>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/admin/reports"
          className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur hover:border-blue-500/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Reports</h3>
              <p className="text-sm text-muted-foreground">Generate detailed reports</p>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
