'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    platformName: 'Prime Invest',
    platformFee: 2,
    minDeposit: 10,
    maxDeposit: 100000,
    maintenanceMode: false,
    emailNotifications: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
      className="p-6 md:p-8 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and parameters</p>
      </motion.div>

      {/* General Settings */}
      <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur mb-6">
        <h2 className="text-2xl font-bold mb-6">General Settings</h2>

        <div className="space-y-6">
          {/* Platform Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Platform Name</label>
            <input
              type="text"
              name="platformName"
              value={settings.platformName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
            />
          </div>

          {/* Platform Fee */}
          <div>
            <label className="block text-sm font-medium mb-2">Platform Fee (%)</label>
            <input
              type="number"
              name="platformFee"
              value={settings.platformFee}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.1"
              className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
            />
          </div>

          {/* Min/Max Deposit */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Minimum Deposit</label>
              <input
                type="number"
                name="minDeposit"
                value={settings.minDeposit}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Maximum Deposit</label>
              <input
                type="number"
                name="maxDeposit"
                value={settings.maxDeposit}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Platform Status */}
      <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur mb-6">
        <h2 className="text-2xl font-bold mb-6">Platform Status</h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="w-4 h-4 rounded accent-destructive"
            />
            <div>
              <p className="font-medium">Maintenance Mode</p>
              <p className="text-sm text-muted-foreground">Disable platform access for users</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
              className="w-4 h-4 rounded accent-destructive"
            />
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Send email notifications to users</p>
            </div>
          </label>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>

        {saved && (
          <div className="flex items-center px-4 py-3 rounded-lg bg-green-500/20 text-green-500 font-medium">
            Settings saved successfully!
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
