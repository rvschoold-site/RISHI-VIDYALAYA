import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmissionLead extends Document {
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionLeadSchema: Schema = new Schema({
  parentName: { type: String, required: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  grade: { type: String, required: true },
  status: { type: String, default: 'NEW' },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


export default mongoose.models.AdmissionLead || mongoose.model<IAdmissionLead>('AdmissionLead', AdmissionLeadSchema);
