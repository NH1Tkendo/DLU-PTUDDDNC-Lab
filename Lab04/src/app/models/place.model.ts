export interface Place {
  id: string;
  title: string;
  image?: string;      // Single URL (legacy support)
  images?: string[];   // Array of URLs
  description?: string;
  rating: number;
  price: number;
  location?: string;
}
