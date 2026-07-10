'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Lock, Bell, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/profile');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setFormData({
            fullName: data.user.fullName,
            email: data.user.email,
            phone: data.user.phone,
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // This would connect to an actual update API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage('Settings updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
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
      className="p-6 md:p-8 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </motion.div>

      {/* Profile Settings */}
      <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur mb-6">
        <h2 className="text-2xl font-bold mb-6">Account Information</h2>

        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${message.includes('success') ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
          >
            <Save className="w-5 h-5" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Security</h2>
        </div>

        <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border/50 hover:bg-accent/10 transition-all">
          <span className="font-medium">Change Password</span>
          <span className="text-muted-foreground">→</span>
        </button>
      </motion.div>

      {/* Notification Settings */}
      <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Notifications</h2>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Email notifications for transactions', key: 'email_tx' },
            { label: 'Email notifications for deposits/withdrawals', key: 'email_dep' },
            { label: 'SMS notifications for large transactions', key: 'sms_large' },
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded accent-primary"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div variants={itemVariants}>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-destructive/10 text-destructive rounded-lg font-semibold hover:bg-destructive/20 transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </motion.div>
    </motion.div>
  );
}
