import mongoose from 'mongoose';

export interface IInvestment {
  _id?: string;
  userId: string;
  planId: string;
  amount: number;
  duration: number;
  rate: number;
  status: 'active' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  profit: number;
  totalReturn: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const investmentSchema = new mongoose.Schema<IInvestment>(
  {
    userId: { type: String, required: true, index: true },
    planId: { type: String, required: true },
    amount: { type: Number, required: true },
    duration: { type: Number, required: true }, // in days
    rate: { type: Number, required: true }, // percentage
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    profit: { type: Number, default: 0 },
    totalReturn: { type: Number, default: 0 },
  },
  { timestamps: true }
);

investmentSchema.pre('save', function (next) {
  this.endDate = new Date(this.startDate.getTime() + this.duration * 24 * 60 * 60 * 1000);
  this.profit = (this.amount * this.rate) / 100;
  this.totalReturn = this.amount + this.profit;
  next();
});

export default mongoose.models.Investment || mongoose.model<IInvestment>('Investment', investmentSchema);
