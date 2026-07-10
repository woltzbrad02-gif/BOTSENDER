'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, Wallet, DollarSign, Gift, ArrowRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', earnings: 400, deposits: 2400 },
  { month: 'Feb', earnings: 600, deposits: 2210 },
  { month: 'Mar', earnings: 800, deposits: 2290 },
  { month: 'Apr', earnings: 1200, deposits: 2000 },
  { month: 'May', earnings: 1400, deposits: 2181 },
  { month: 'Jun', earnings: 1800, deposits: 2500 },
];

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/profile');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    {
      icon: Wallet,
      label: 'Current Balance',
      value: `$${(user?.balance || 0).toFixed(2)}`,
      change: '+5.2%',
      positive: true,
    },
    {
      icon: DollarSign,
      label: 'Total Deposits',
      value: `$${(user?.totalDeposits || 0).toFixed(2)}`,
      change: '+2.1%',
      positive: true,
    },
    {
      icon: TrendingUp,
      label: 'Total Earnings',
      value: `$${(user?.totalEarnings || 0).toFixed(2)}`,
      change: '+12.5%',
      positive: true,
    },
    {
      icon: Gift,
      label: 'Referral Earnings',
      value: `$${(user?.referralEarnings || 0).toFixed(2)}`,
      change: '+3.2%',
      positive: true,
    },
  ];

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

  return (
    <motion.div
      className="p-6 md:p-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.fullName}!</h1>
        <p className="text-muted-foreground">Here&apos;s your investment overview</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-sm font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-4">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Earnings Chart */}
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
          <h2 className="text-xl font-bold mb-6">Earnings Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
              <XAxis stroke="rgba(160, 160, 160, 0.5)" />
              <YAxis stroke="rgba(160, 160, 160, 0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(26, 26, 46, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="earnings" stroke="#d4af37" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Deposits Chart */}
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
          <h2 className="text-xl font-bold mb-6">Deposits Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
              <XAxis stroke="rgba(160, 160, 160, 0.5)" />
              <YAxis stroke="rgba(160, 160, 160, 0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(26, 26, 46, 0.8)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="deposits" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/deposit"
          className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur hover:border-primary/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Make a Deposit</h3>
              <p className="text-sm text-muted-foreground">Add funds to your account</p>
            </div>
            <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/dashboard/invest"
          className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-secondary/10 to-secondary/5 backdrop-blur hover:border-secondary/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Start Investing</h3>
              <p className="text-sm text-muted-foreground">Choose an investment plan</p>
            </div>
            <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/dashboard/referral"
          className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur hover:border-accent/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Share Referral Link</h3>
              <p className="text-sm text-muted-foreground">Earn passive income</p>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
