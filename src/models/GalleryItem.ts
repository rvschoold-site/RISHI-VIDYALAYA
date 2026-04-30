import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  description?: string;
  category?: string;
  type: 'local' | 'cloudinary';
  url: string;
  publicId?: string; // Cloudinary
  fileName: string;
  mimeType: string;
  size: number;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, default: 'General' },
  type: { type: String, enum: ['local', 'cloudinary'], required: true },
  url: { type: String, required: true },
  publicId: { type: String },
  fileName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.models.GalleryItem || mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
