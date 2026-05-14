import type { Actor, Credit, Locale } from "./types";

const genres = ["Drama", "Thriller", "Comedy", "Romance", "Sci-Fi", "Historical", "Indie", "Action"];
const roles: Credit["role"][] = ["Actor", "Producer", "Voice", "Director"];

function buildCredits(): Credit[] {
  return Array.from({ length: 220 }, (_, index) => {
    const year = 2026 - (index % 24);
    const genre = genres[index % genres.length];
    const role = roles[index % roles.length];
    const n = index + 1;

    return {
      id: `credit-${n}`,
      year,
      title: {
        en: `${genre} Frame ${n}`,
        hi: `${genre} फ्रेम ${n}`
      },
      alternateTitles: [`Festival Cut ${n}`, `International Title ${n}`],
      genre,
      role,
      character: {
        en: role === "Producer" ? "Creative producer" : `Asha ${n}`,
        hi: role === "Producer" ? "क्रिएटिव प्रोड्यूसर" : `आशा ${n}`
      },
      popularity: 1000 - index
    };
  });
}

const actors: Record<string, Actor> = {
  "kashis-ray": {
    slug: "kashis-ray",
    name: {
      en: "Kashis Ray",
      hi: "काशिस रे"
    },
    alternateNames: ["K. Ray", "Kashis R."],
    imagePath: "/images/kashis-ray.svg",
    bio: {
      en: "Kashis Ray is a bilingual screen actor known for precise, restrained performances across independent dramas, festival thrillers, and streaming limited series. Her recent work moves between intimate character studies and larger ensemble productions without losing emotional clarity.",
      hi: "काशिस रे एक द्विभाषी स्क्रीन कलाकार हैं, जो स्वतंत्र ड्रामा, फेस्टिवल थ्रिलर और स्ट्रीमिंग सीरीज में सधी हुई अदाकारी के लिए जानी जाती हैं।"
    },
    birthplace: {
      en: "Mumbai, India",
      hi: "मुंबई, भारत"
    },
    credits: buildCredits(),
    awards: [
      {
        year: 2025,
        title: { en: "National Critics Circle", hi: "नेशनल क्रिटिक्स सर्कल" },
        body: { en: "Best actor for Silent Monsoon.", hi: "साइलेंट मॉनसून के लिए सर्वश्रेष्ठ कलाकार।" }
      },
      {
        year: 2023,
        title: { en: "Streaming Guild Awards", hi: "स्ट्रीमिंग गिल्ड अवॉर्ड्स" },
        body: { en: "Limited series ensemble citation.", hi: "लिमिटेड सीरीज एन्सेम्बल सम्मान।" }
      }
    ],
    social: [
      { network: "Instagram", handle: "@kashisray", url: "https://example.com/kashisray" },
      { network: "Letterboxd", handle: "kashis-watches", url: "https://example.com/kashis-watches" }
    ],
    similarActors: [
      {
        name: { en: "Anika Sen", hi: "अनिका सेन" },
        reason: { en: "Quiet dramatic leads and multilingual credits.", hi: "शांत ड्रामेटिक भूमिकाएं और बहुभाषी क्रेडिट।" }
      },
      {
        name: { en: "Leela Kapoor", hi: "लीला कपूर" },
        reason: { en: "Festival circuit crossover with prestige television.", hi: "फेस्टिवल सिनेमा और प्रतिष्ठित टीवी का मेल।" }
      }
    ],
    updatedAt: "2026-05-10T10:30:00.000Z"
  }
};

export async function readActorDocument(slug: string): Promise<Actor | null> {
  await new Promise((resolve) => setTimeout(resolve, 18));
  return actors[slug] ?? null;
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "hi";
}
