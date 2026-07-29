import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  summary: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: Date;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  coverImage: { type: String, default: '' },
  category: { type: String, default: 'News & Announcements' },
  tags: [{ type: String }],
  author: { type: String, default: 'Rishi Vidyalaya Team' },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED'], default: 'PUBLISHED' },
  publishedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  metaTitle: { type: String },
  metaDescription: { type: String },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
