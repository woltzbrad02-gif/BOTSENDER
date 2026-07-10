'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const investmentPlans = [
  {
    id: '1',
    name: 'Starter',
    minAmount: 100,
    maxAmount: 5000,
    duration: 30,
    rate: 8,
    description: 'Perfect for beginners',
    features: ['30 days duration', '8% returns', 'No hidden fees', 'Easy withdrawal'],
  },
  {
    id: '2',
    name: 'Professional',
    minAmount: 5001,
    maxAmount: 50000,
    duration: 60,
    rate: 12,
    description: 'For serious investors',
    features: ['60 days duration', '12% returns', 'Priority support', 'Flexible terms'],
  },
  {
    id: '3',
    name: 'Premium',
    minAmount: 50001,
    maxAmount: 500000,
    duration: 90,
    rate: 18,
    description: 'Maximum returns',
    features: ['90 days duration', '18% returns', 'Dedicated account manager', 'Bonus rewards'],
  },
];

export default function InvestPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const plan = investmentPlans.find((p) => p.id === selectedPlan);
  const projectedReturn = plan && amount ? (parseFloat(amount) * plan.rate) / 100 : 0;

  const handleInvest = async () => {
    if (!selectedPlan || !amount) {
      setError('Please select a plan and enter an amount');
      return;
    }

    const numAmount = parseFloat(amount);
    if (!plan || numAmount < plan.minAmount || numAmount > plan.maxAmount) {
      setError(`Amount must be between $${plan?.minAmount} and $${plan?.maxAmount}`);
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // This would connect to an actual investment API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(`Investment of $${amount} in ${plan.name} plan created successfully!`);
      setAmount('');
      setSelectedPlan(null);
    } catch (err) {
      setError('Investment creation failed. Please try again.');
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
      className="p-6 md:p-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Investment Plans</h1>
        <p className="text-muted-foreground">Choose the perfect plan for your investment goals</p>
      </motion.div>

      {/* Plans Grid */}
      <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-8">
        {investmentPlans.map((planItem) => (
          <div
            key={planItem.id}
            onClick={() => setSelectedPlan(planItem.id)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              selectedPlan === planItem.id
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-border/50 bg-card/50 hover:border-primary/50'
            }`}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{planItem.name}</h3>
              <p className="text-muted-foreground text-sm">{planItem.description}</p>
            </div>

            <div className="mb-6 p-4 rounded-lg bg-background/50">
              <div className="mb-4">
                <p className="text-muted-foreground text-sm">Annual Returns</p>
                <p className="text-3xl font-bold text-primary">{planItem.rate}%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Duration</p>
                <p className="text-lg font-semibold">{planItem.duration} Days</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {planItem.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Investment Range</p>
              <p className="font-semibold">
                ${planItem.minAmount.toLocaleString()} - ${planItem.maxAmount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Investment Form */}
      {selectedPlan && plan && (
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur max-w-2xl"
        >
          <h2 className="text-2xl font-bold mb-6">Invest in {plan.name} Plan</h2>

          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Investment Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter amount"
                  min={plan.minAmount}
                  max={plan.maxAmount}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Min: ${plan.minAmount} | Max: ${plan.maxAmount}
              </p>
            </div>

            {/* Projected Returns */}
            {amount && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Investment Amount</p>
                    <p className="text-xl font-bold">${parseFloat(amount).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Projected Return</p>
                    <p className="text-xl font-bold text-primary">${projectedReturn.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Duration</p>
                    <p className="text-xl font-bold">{plan.duration} days</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Return</p>
                    <p className="text-xl font-bold text-green-500">
                      ${(parseFloat(amount) + projectedReturn).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && <div className="p-3 rounded-lg bg-destructive/20 text-destructive text-sm">{error}</div>}

            {/* Success Message */}
            {success && <div className="p-3 rounded-lg bg-green-500/20 text-green-500 text-sm">{success}</div>}

            {/* Submit Button */}
            <button
              onClick={handleInvest}
              disabled={isLoading || !amount}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 transition-all disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : `Invest ${amount ? `$${amount}` : ''}`}
            </button>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!selectedPlan && (
        <motion.div variants={itemVariants} className="text-center p-12">
          <p className="text-muted-foreground">Select a plan above to get started</p>
        </motion.div>
      )}
    </motion.div>
  );
}
