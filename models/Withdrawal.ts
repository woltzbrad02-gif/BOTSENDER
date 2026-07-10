import mongoose from 'mongoose';

export interface IWithdrawal {
  _id?: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const withdrawalSchema = new mongoose.Schema<IWithdrawal>(
  {
    userId: { type: String, required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    bankDetails: {
      bankName: { type: String, required: true },
      accountNumber: { type: String, required: true },
      accountHolder: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Withdrawal || mongoose.model<IWithdrawal>('Withdrawal', withdrawalSchema);
