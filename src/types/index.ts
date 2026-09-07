export type GuestCategory =
  | 'Spirituality'
  | 'Cinema & Television'
  | 'Entrepreneurship'
  | 'Social Impact'
  | 'Wellness'
  | 'Culture';

export interface Guest {
  id: string;
  slug: string;
  name: string;
  category: GuestCategory;
  roleTitle: string;
  bio: string;
  fullDescription: string;
  portraitUrl: string;
  youtubeUrl: string;
  episodeTitle: string;
  keyTopics: string[];
  isFeatured?: boolean;
  orderIndex: number;
}

export interface Episode {
  id: string;
  title: string;
  guestId: string;
  guestName: string;
  guestCategory: GuestCategory;
  description: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  duration?: string;
  publishDate: string;
  isFeatured?: boolean;
  keyTopics?: string[];
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Closed';

export type EnquiryType =
  | 'Podcast Guest'
  | 'Brand Collaboration'
  | 'Sponsorship'
  | 'Media'
  | 'General Enquiry'
  | 'Other';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: EnquiryType | string;
  message: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  hostName: string;
  hostRole: string;
  hostBio: string;
  hostPortraitUrl: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  instagramUrl: string;
  youtubeUrl: string;
  featuredEpisodeId: string;
}
