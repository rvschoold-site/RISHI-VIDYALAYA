import mongoose, { Schema, Document } from 'mongoose';

export interface IFile extends Document {
  userId: mongoose.Types.ObjectId;
  fileName: string;
  fileType: string;
  mimeType: string;
  storage: 's3';
  url: string;
  key?: string; // S3 object key
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Admin', required: false },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  mimeType: { type: String, required: true },
  storage: { type: String, enum: ['s3'], required: true },
  url: { type: String, required: true },
  key: { type: String },
  size: { type: Number, required: true },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.models.File || mongoose.model<IFile>('File', FileSchema);
