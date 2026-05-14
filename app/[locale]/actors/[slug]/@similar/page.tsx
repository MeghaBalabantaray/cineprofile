import { notFound } from "next/navigation";
import { getActor } from "@/lib/actor-service";
import { isLocale } from "@/lib/mock-firestore";
import { t } from "@/lib/i18n";

export const runtime = "edge";
export const revalidate = 900;

type Params = Promise<{ locale: string; slug: string }>;

export default async function SimilarPanel({ params }: { params: Params }) {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "en";
  const actor = await getActor(slug);

  if (!actor) {
    notFound();
  }

  return (
    <section className="panel">
      <h2>Similar actors</h2>
      <ul>
        {actor.similarActors.map((item) => (
          <li key={t(item.name, locale)}>
            <strong>{t(item.name, locale)}</strong>
            <span className="muted">{t(item.reason, locale)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
