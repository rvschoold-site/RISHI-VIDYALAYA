import mongoose, { Schema, Document } from 'mongoose';

export interface IPageSection {
  id: string;
  type: string;
  title?: string;
  content: any;
  order: number;
  isVisible: boolean;
}

export interface IPageContent extends Document {
  slug: string; // e.g. 'home', 'about', 'academics'
  title: string;
  sections: IPageSection[];
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  updatedAt: Date;
}

const PageSectionSchema: Schema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String },
  content: { type: Schema.Types.Mixed, default: {} },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
});

const PageContentSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  sections: [PageSectionSchema],
  metadata: {
    title: { type: String },
    description: { type: String },
    keywords: { type: String },
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.models.PageContent || mongoose.model<IPageContent>('PageContent', PageContentSchema);
