import mongoose from 'mongoose';

export interface IDeposit {
  _id?: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  transactionId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const depositSchema = new mongoose.Schema<IDeposit>(
  {
    userId: { type: String, required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export default mongoose.models.Deposit || mongoose.model<IDeposit>('Deposit', depositSchema);
