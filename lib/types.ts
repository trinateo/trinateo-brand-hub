export interface Profile {
  id: string;
  user_id: string | null;
  full_name: string;
  tagline: string;
  bio: string;
  headshot_url: string | null;
  linkedin_url: string | null;
  expertise_tags: string[];
  created_at: string;
}

export interface ServiceOffer {
  id: string;
  user_id: string | null;
  title: string;
  slug: string;
  summary: string;
  description: string | null;
  who_its_for: string | null;
  outcomes: string | null;
  cta_label: string;
  sort_order: number;
  published: boolean;
  created_at: string;
}

export interface CaseStudy {
  id: string;
  user_id: string | null;
  title: string;
  slug: string;
  client_sector: string | null;
  challenge: string | null;
  approach: string | null;
  outcome: string | null;
  tags: string[];
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  user_id: string | null;
  author_name: string;
  author_role: string | null;
  author_company: string | null;
  quote: string;
  related_service_id: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface SpeakingEngagement {
  id: string;
  user_id: string | null;
  event_name: string;
  event_date: string | null;
  location: string | null;
  topic: string | null;
  audience_type: string | null;
  event_url: string | null;
  is_upcoming: boolean;
  published: boolean;
  created_at: string;
}

export interface Resource {
  id: string;
  user_id: string | null;
  title: string;
  description: string | null;
  resource_type: string;
  file_url: string | null;
  external_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export type EnquiryStatus = "new" | "reviewed" | "responded";

export interface Enquiry {
  id: string;
  user_id: string | null;
  visitor_name: string;
  visitor_email: string;
  visitor_company: string | null;
  visitor_role: string | null;
  message: string;
  how_can_i_help: string | null;
  referral_source: string | null;
  status: EnquiryStatus;
  admin_notes: string | null;
  enquiry_summary: string | null;
  enquiry_summary_source: string | null;
  enquiry_summary_confidence: number | null;
  enquiry_summary_review_status: string | null;
  created_at: string;
}
