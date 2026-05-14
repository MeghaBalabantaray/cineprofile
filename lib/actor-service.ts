import "server-only";

import { unstable_cache } from "next/cache";
import { canReadActor, publicViewer } from "./policy";
import { readActorDocument } from "./mock-firestore";

export const ACTOR_CACHE_TAG = "actor-profile";

export const getActor = unstable_cache(
  async (slug: string) => {
    const actor = await readActorDocument(slug);

    if (!actor || !canReadActor(publicViewer, actor)) {
      return null;
    }

    return actor;
  },
  ["actor"],
  {
    revalidate: 900,
    tags: [ACTOR_CACHE_TAG]
  }
);
