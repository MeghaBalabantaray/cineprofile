import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import FilmographyExplorer from "@/app/components/FilmographyExplorer";
import { getActor } from "@/lib/actor-service";
import { isLocale } from "@/lib/mock-firestore";
import { signImagePath } from "@/lib/signed-image";
import { t } from "@/lib/i18n";

export const runtime = "edge";
export const revalidate = 900;

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";
  const actor = await getActor(slug);

  if (!actor) {
    return { title: "Actor not found" };
  }

  return {
    title: t(actor.name, locale),
    description: t(actor.bio, locale),
    alternates: {
      canonical: `/${locale}/actors/${actor.slug}`,
      languages: {
        en: `/en/actors/${actor.slug}`,
        hi: `/hi/actors/${actor.slug}`
      }
    }
  };
}

export default async function ActorPage({ params }: { params: Params }) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";
  const actor = await getActor(slug);

  if (!actor) {
    notFound();
  }

  const signedImage = await signImagePath(actor.imagePath);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t(actor.name, locale),
    alternateName: actor.alternateNames,
    image: signedImage,
    birthPlace: t(actor.birthplace, locale),
    description: t(actor.bio, locale),
    jobTitle: "Actor",
    sameAs: actor.social.map((item) => item.url),
    workExample: actor.credits.slice(0, 12).map((credit) => ({
      "@type": "Movie",
      name: t(credit.title, locale),
      alternateName: credit.alternateTitles,
      datePublished: `${credit.year}`
    }))
  };

  const latest = actor.credits[0]?.year ?? new Date(actor.updatedAt).getFullYear();
  const genres = new Set(actor.credits.map((credit) => credit.genre)).size;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="hero">
        <div className="portrait">
          <Image
            src={signedImage}
            alt={t(actor.name, locale)}
            width="760"
            height="980"
            priority
            fetchPriority="high"
            sizes="(max-width: 900px) 100vw, 430px"
            unoptimized
          />
        </div>
        <div className="hero-copy">
          <div className="kicker">{t(actor.birthplace, locale)}</div>
          <h1>{t(actor.name, locale)}</h1>
          <p className="bio">{t(actor.bio, locale)}</p>
          <div className="facts" aria-label="Career facts">
            <div className="fact">
              <strong>{actor.credits.length}</strong>
              <span>credits indexed</span>
            </div>
            <div className="fact">
              <strong>{genres}</strong>
              <span>genres</span>
            </div>
            <div className="fact">
              <strong>{latest}</strong>
              <span>latest release</span>
            </div>
          </div>
        </div>
      </section>
      <FilmographyExplorer credits={actor.credits} locale={locale} />
    </>
  );
}
