
export type Niche = 'store' | 'gamer' | 'luxury_cars';

export type BannerType = 
  | 'flash_promo' | 'launch' | 'clearance' | 'black_friday' | 'ecommerce' | 'facade'
  | 'channel' | 'esports' | 'stream' | 'peripheral' | 'tournament'
  | 'car_sale' | 'car_rental' | 'car_event' | 'car_performance' | 'car_showcase';

export type Format = 
  | 'instagram_feed' | 'instagram_stories' | 'facebook' | 'youtube_thumb' | 'tiktok' | 'site_banner' | 'google_ads';

export interface BannerConfig {
  niche: Niche;
  type: BannerType;
  format: Format;
  mainText: string;
  brandName?: string;
  accentColor: string;
}

export interface GeneratedBanner {
  imageUrl: string;
  title: string;
  hashtags: string[];
  description: string;
}
