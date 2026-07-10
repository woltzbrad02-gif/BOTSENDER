'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, Users, DollarSign } from 'lucide-react';

export default function ReferralPage() {
  const [user, setUser] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/profile');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const referralLink = `${process.env.NEXT_PUBLIC_API_URL}/register?ref=${user?.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      className="p-6 md:p-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Referral Program</h1>
        <p className="text-muted-foreground">Earn passive income by referring friends</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Referrals</p>
              <p className="text-3xl font-bold">0</p>
            </div>
            <Users className="w-10 h-10 text-primary/50" />
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Referral Earnings</p>
              <p className="text-3xl font-bold">${(user?.referralEarnings || 0).toFixed(2)}</p>
            </div>
            <DollarSign className="w-10 h-10 text-primary/50" />
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
          <div>
            <p className="text-muted-foreground text-sm">Commission Rate</p>
            <p className="text-3xl font-bold">5%</p>
            <p className="text-xs text-muted-foreground mt-1">Per referral</p>
          </div>
        </div>
      </motion.div>

      {/* Referral Link */}
      <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Referral Link</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Referral Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={user?.referralCode || ''}
                readOnly
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Referral Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-input text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary overflow-x-auto"
              />
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Share Your Link</h3>
              <p className="text-muted-foreground text-sm">Share your unique referral link with friends and family</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">They Register</h3>
              <p className="text-muted-foreground text-sm">Your friends sign up using your referral code</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Earn Commission</h3>
              <p className="text-muted-foreground text-sm">Get 5% commission on their first deposit</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
              4
            </div>
            <div>
              <h3 className="font-semibold mb-1">Get Bonus</h3>
              <p className="text-muted-foreground text-sm">Both you and your referral receive $5 bonus</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
