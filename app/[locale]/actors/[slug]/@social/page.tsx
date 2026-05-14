import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { getActor } from "@/lib/actor-service";

export const runtime = "edge";
export const revalidate = 900;

type Params = Promise<{ slug: string }>;

export default async function SocialPanel({ params }: { params: Params }) {
  const { slug } = await params;
  const actor = await getActor(slug);

  if (!actor) {
    notFound();
  }

  return (
    <section className="panel">
      <h2>Social</h2>
      <ul>
        {actor.social.map((item) => (
          <li key={item.network}>
            <a href={item.url} rel="noreferrer" target="_blank">
              <strong>{item.network}</strong>
              <span className="muted"> {item.handle} <ExternalLink size={13} aria-hidden /></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
