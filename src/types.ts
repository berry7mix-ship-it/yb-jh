export interface GuestbookEntry {
  id: string;
  name: string;
  password?: string;
  message: string;
  createdAt: string;
}

export interface RsvpEntry {
  id: string;
  side: 'groom' | 'bride';
  name: string;
  phone: string;
  attendeesCount: number;
  dining: 'yes' | 'no' | 'undecided';
  memo?: string;
  createdAt: string;
}

export interface BankAccount {
  holder: string;
  relationship: string;
  bank: string;
  accountNumber: string;
  kakaoPayUrl?: string;
  tossUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  fallback?: string;
  alt: string;
  caption?: string;
  aspectRatio?: string;
}
