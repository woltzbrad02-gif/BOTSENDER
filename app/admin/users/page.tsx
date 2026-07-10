'use client';

import { motion } from 'framer-motion';
import { Trash2, Eye } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    balance: 5000,
    joinDate: '2024-01-10',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    balance: 12500,
    joinDate: '2024-01-12',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    status: 'inactive',
    balance: 2000,
    joinDate: '2024-01-05',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    status: 'active',
    balance: 8500,
    joinDate: '2024-01-15',
  },
];

export default function AdminUsersPage() {
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
        <h1 className="text-4xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage and monitor user accounts</p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users..."
          className="flex-1 px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
        />
        <select className="px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-destructive">
          <option>All Users</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </motion.div>

      {/* Users Table */}
      <motion.div variants={itemVariants} className="overflow-x-auto rounded-xl border border-border/50 bg-card/50 backdrop-blur">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Balance</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Join Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border/50 hover:bg-accent/5 transition-all">
                <td className="px-6 py-4">
                  <p className="font-medium">{user.name}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold">${user.balance.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      user.status === 'active'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">{new Date(user.joinDate).toLocaleDateString()}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-accent/20 rounded-lg transition-all text-primary hover:text-primary/80">
                      <Eye className="w-4 h-4" />
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
                  ? 'bg-destructive text-destructive-foreground'
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
