import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUser {
  _id?: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  country: string;
  currency: 'USD' | 'ZWG';
  password: string;
  referralCode: string;
  referredBy?: string;
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalEarnings: number;
  referralEarnings: number;
  isAdmin: boolean;
  emailVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    currency: { type: String, enum: ['USD', 'ZWG'], default: 'USD' },
    password: { type: String, required: true },
    referralCode: { type: String, unique: true, sparse: true },
    referredBy: { type: String, default: null },
    balance: { type: Number, default: 50 }, // Welcome bonus
    totalDeposits: { type: Number, default: 0 },
    totalWithdrawals: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    referralEarnings: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  const hashedPassword = await bcryptjs.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// Generate referral code
userSchema.pre('save', function (next) {
  if (!this.referralCode) {
    this.referralCode = this.username + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password: string) {
  return await bcryptjs.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
