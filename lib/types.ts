export type Locale = "en" | "hi";

export type LocalizedText = Record<Locale, string>;

export type CreditRole = "Actor" | "Producer" | "Voice" | "Director";

export type Credit = {
  id: string;
  year: number;
  title: LocalizedText;
  alternateTitles: string[];
  genre: string;
  role: CreditRole;
  character: LocalizedText;
  popularity: number;
};

export type Actor = {
  slug: string;
  name: LocalizedText;
  alternateNames: string[];
  imagePath: string;
  bio: LocalizedText;
  birthplace: LocalizedText;
  credits: Credit[];
  awards: Array<{ year: number; title: LocalizedText; body: LocalizedText }>;
  social: Array<{ network: string; handle: string; url: string }>;
  similarActors: Array<{ name: LocalizedText; reason: LocalizedText }>;
  updatedAt: string;
};
