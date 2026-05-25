import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  description?: string;
  category?: string;
  type: 'local' | 's3';
  url: string;
  key?: string; // S3 object key
  fileName: string;
  mimeType: string;
  size: number;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: 'General' },
  type: { type: String, enum: ['local', 's3'], required: true },
  url: { type: String, required: true },
  key: { type: String },
  fileName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.models.GalleryItem || mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
