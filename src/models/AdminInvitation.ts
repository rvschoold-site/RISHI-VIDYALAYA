import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminInvitation extends Document {
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN';
  token: string;
  expiresAt: Date;
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED';
  createdAt: Date;
}

const AdminInvitationSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['ADMIN', 'SUPER_ADMIN'], default: 'ADMIN' },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  status: { type: String, enum: ['PENDING', 'ACCEPTED', 'EXPIRED'], default: 'PENDING' },
}, { 
  timestamps: true 
});

export default mongoose.models.AdminInvitation || mongoose.model<IAdminInvitation>('AdminInvitation', AdminInvitationSchema);
