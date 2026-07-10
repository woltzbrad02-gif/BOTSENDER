'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, DollarSign } from 'lucide-react';

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Instant deposit' },
  { id: 'bank', name: 'Bank Transfer', icon: Banknote, description: '1-2 business days' },
];

export default function DepositPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeposit = async () => {
    if (!selectedMethod || !amount) {
      setError('Please select a payment method and enter an amount');
      return;
    }

    const numAmount = parseFloat(amount);
    if (numAmount < 10) {
      setError('Minimum deposit is $10');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(`Deposit of $${amount} initiated successfully! Funds will be credited shortly.`);
      setAmount('');
      setSelectedMethod(null);
    } catch (err) {
      setError('Deposit failed. Please try again.');
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
        <h1 className="text-4xl font-bold mb-2">Make a Deposit</h1>
        <p className="text-muted-foreground">Add funds to your account and start investing</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold">Payment Method</h2>
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border/50 bg-card/50 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-5 h-5" />
                  <h3 className="font-semibold">{method.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Deposit Form */}
        {selectedMethod && (
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur"
          >
            <h2 className="text-2xl font-bold mb-6">Deposit Amount</h2>

            <div className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Amount (USD)</label>
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
                    min="10"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Minimum deposit: $10</p>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium mb-3">Quick Select</label>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 500, 1000, 5000].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="py-2 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all text-sm font-medium"
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {amount && (
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deposit Amount</span>
                    <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Fee</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="border-t border-primary/20 pt-2 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-lg font-bold text-primary">${parseFloat(amount).toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && <div className="p-3 rounded-lg bg-destructive/20 text-destructive text-sm">{error}</div>}

              {/* Success Message */}
              {success && <div className="p-3 rounded-lg bg-green-500/20 text-green-500 text-sm">{success}</div>}

              {/* Submit Button */}
              <button
                onClick={handleDeposit}
                disabled={isLoading || !amount}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 transition-all disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing Deposit...' : `Deposit $${amount || '0'}`}
              </button>

              {/* Info */}
              <div className="p-4 rounded-lg bg-background/50 text-sm text-muted-foreground space-y-2">
                <p>Your deposit is secured with industry-standard encryption</p>
                <p>Funds will be credited to your account within the specified timeframe</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!selectedMethod && (
          <motion.div variants={itemVariants} className="lg:col-span-2 text-center p-12">
            <p className="text-muted-foreground">Select a payment method to continue</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
