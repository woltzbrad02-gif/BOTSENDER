import mongoose from 'mongoose';

export interface IInvestmentPlan {
  _id?: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  duration: number; // in days
  rate: number; // percentage
  description: string;
  icon: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const investmentPlanSchema = new mongoose.Schema<IInvestmentPlan>(
  {
    name: { type: String, required: true },
    minAmount: { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    duration: { type: Number, required: true },
    rate: { type: Number, required: true },
    description: { type: String },
    icon: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.InvestmentPlan || mongoose.model<IInvestmentPlan>('InvestmentPlan', investmentPlanSchema);
