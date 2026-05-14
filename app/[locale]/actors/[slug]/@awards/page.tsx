import { notFound } from "next/navigation";
import { getActor } from "@/lib/actor-service";
import { isLocale } from "@/lib/mock-firestore";
import { t } from "@/lib/i18n";

export const runtime = "edge";
export const revalidate = 900;

type Params = Promise<{ locale: string; slug: string }>;

export default async function AwardsPanel({ params }: { params: Params }) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";
  const actor = await getActor(slug);

  if (!actor) {
    notFound();
  }

  return (
    <section className="panel">
      <h2>Awards</h2>
      <ul>
        {actor.awards.map((award) => (
          <li key={`${award.year}-${t(award.title, locale)}`}>
            <strong>{award.year} · {t(award.title, locale)}</strong>
            <span className="muted">{t(award.body, locale)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
