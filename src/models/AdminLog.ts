import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminLog extends Document {
  adminId: mongoose.Types.ObjectId;
  adminName: string;
  action: string;
  module: string; // e.g., 'AUTH', 'SETTINGS', 'ADMISSIONS', 'CAREERS'
  details: string;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const AdminLogSchema: Schema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  adminName: { type: String, required: true },
  action: { type: String, required: true },
  module: { type: String, required: true },
  details: { type: String, required: true },
  ip: { type: String },
  userAgent: { type: String },
}, { 
  timestamps: { createdAt: true, updatedAt: false } 
});

// Index for faster queries
AdminLogSchema.index({ adminId: 1, createdAt: -1 });
AdminLogSchema.index({ module: 1 });

export default mongoose.models.AdminLog || mongoose.model<IAdminLog>('AdminLog', AdminLogSchema);
