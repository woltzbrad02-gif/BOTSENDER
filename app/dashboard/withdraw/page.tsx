'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, AlertCircle } from 'lucide-react';

export default function WithdrawPage() {
  const [user, setUser] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/auth/profile');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setAccountHolder(data.user.fullName);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleWithdraw = async () => {
    if (!amount || !bankName || !accountNumber) {
      setError('Please fill in all required fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (numAmount < 50) {
      setError('Minimum withdrawal is $50');
      return;
    }

    if (numAmount > (user?.balance || 0)) {
      setError('Insufficient balance');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(`Withdrawal request of $${amount} submitted successfully! You will receive funds in 1-3 business days.`);
      setAmount('');
      setBankName('');
      setAccountNumber('');
    } catch (err) {
      setError('Withdrawal failed. Please try again.');
    } finally {
      setIsLoading(false);
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
        <h1 className="text-4xl font-bold mb-2">Withdraw Funds</h1>
        <p className="text-muted-foreground">Request a withdrawal from your account</p>
      </motion.div>

      <div className="max-w-2xl">
        {/* Available Balance */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur mb-6"
        >
          <p className="text-muted-foreground text-sm mb-1">Available Balance</p>
          <p className="text-4xl font-bold text-primary">${(user?.balance || 0).toFixed(2)}</p>
        </motion.div>

        {/* Withdrawal Form */}
        <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur">
          <h2 className="text-2xl font-bold mb-6">Withdrawal Details</h2>

          <div className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">Withdrawal Amount (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError('');
                  }}
                  placeholder="0.00"
                  min="50"
                  max={user?.balance || 0}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Minimum: $50 | Maximum: ${(user?.balance || 0).toFixed(2)}</p>
            </div>

            {/* Bank Details */}
            <div>
              <h3 className="font-semibold mb-4">Bank Details</h3>
              <div className="space-y-4">
                {/* Bank Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Enter bank name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Account Number */}
                <div>
                  <label className="block text-sm font-medium mb-2">Account Number</label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Account Holder */}
                <div>
                  <label className="block text-sm font-medium mb-2">Account Holder Name</label>
                  <input
                    type="text"
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    placeholder="Account holder name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            {amount && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Withdrawal Amount</span>
                  <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Time</span>
                  <span className="font-semibold">1-3 business days</span>
                </div>
                <div className="border-t border-primary/20 pt-2 flex justify-between">
                  <span className="font-medium">Amount to Receive</span>
                  <span className="text-lg font-bold text-primary">${parseFloat(amount).toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Warning */}
            <div className="flex gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm text-yellow-600">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Processing Time</p>
                <p>Withdrawals are processed within 1-3 business days. Please ensure your bank details are correct.</p>
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="p-3 rounded-lg bg-destructive/20 text-destructive text-sm">{error}</div>}

            {/* Success Message */}
            {success && <div className="p-3 rounded-lg bg-green-500/20 text-green-500 text-sm">{success}</div>}

            {/* Submit Button */}
            <button
              onClick={handleWithdraw}
              disabled={isLoading || !amount}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 transition-all disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing Withdrawal...' : `Withdraw $${amount || '0'}`}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
