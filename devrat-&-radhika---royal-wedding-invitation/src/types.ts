export interface Ceremony {
  id: string;
  name: string;
  hindiName: string;
  date: string;
  time: string;
  venue: string;
  dressCode: string;
  dressPalette: string[];
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  videoSnippet?: string;
  calendarTitle: string;
}

export interface RsvpSubmission {
  id: string;
  name: string;
  email: string;
  attending: 'yes' | 'no';
  guestCount: number;
  events: string[];
  dietPreference: string;
  blessing: string;
  createdAt: string;
}

export interface Blessing {
  id: string;
  author: string;
  relation: string;
  message: string;
  city?: string;
  createdAt: string;
}

export interface WeddingConfig {
  groomName: string;
  brideName: string;
  groomFamily: string;
  brideFamily: string;
  weddingDate: string; // ISO string
  venueName: string;
  venueCity: string;
  venueFullAddress: string;
}
