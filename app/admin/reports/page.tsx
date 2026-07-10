'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 4000, users: 400, investments: 2400 },
  { month: 'Feb', revenue: 5000, users: 600, investments: 2210 },
  { month: 'Mar', revenue: 6000, users: 800, investments: 2290 },
  { month: 'Apr', revenue: 7500, users: 1200, investments: 2000 },
  { month: 'May', revenue: 8500, users: 1400, investments: 2181 },
  { month: 'Jun', revenue: 10000, users: 1800, investments: 2500 },
];

const investmentData = [
  { name: 'Starter', value: 45, color: '#d4af37' },
  { name: 'Professional', value: 35, color: '#3b82f6' },
  { name: 'Premium', value: 20, color: '#ef4444' },
];

export default function AdminReportsPage() {
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
      className="p-6 md:p-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Detailed platform performance metrics</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-destructive/10 text-destructive rounded-lg font-semibold hover:bg-destructive/20 transition-all">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </motion.div>

      {/* Monthly Overview */}
      <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur mb-8">
        <h2 className="text-2xl font-bold mb-6">Monthly Overview</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData}>
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
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#d4af37" name="Revenue ($)" dot={{ r: 5 }} />
            <Line type="monotone" dataKey="users" stroke="#3b82f6" name="Users" dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Two Column Layout */}
      <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Investment Distribution */}
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
          <h2 className="text-2xl font-bold mb-6">Investment Plan Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={investmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {investmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Investment Amount */}
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
          <h2 className="text-2xl font-bold mb-6">Investment Amount Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
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
              <Bar dataKey="investments" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$45,000', change: '+15%' },
          { label: 'Avg Transaction', value: '$1,250', change: '+8%' },
          { label: 'Conversion Rate', value: '12.5%', change: '+2.3%' },
          { label: 'Retention Rate', value: '89%', change: '+5%' },
        ].map((stat, index) => (
          <div key={index} className="p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-green-500 mt-2">{stat.change}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
