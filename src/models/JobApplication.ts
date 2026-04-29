import mongoose, { Schema, Document } from 'mongoose';

export interface IJobApplication extends Document {
  fullName: string;
  email: string;
  phone: string;
  positionType: string;
  positionName: string;
  experience: string;
  qualification: string;
  resumeUrl: string;
  coverLetter?: string;
  subjects?: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  positionType: { type: String, required: true },
  positionName: { type: String, required: true },
  experience: { type: String, required: true },
  qualification: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  coverLetter: { type: String },
  subjects: { type: [String] },
  status: { type: String, default: 'PENDING' },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


export default mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
