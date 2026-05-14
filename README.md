# Actor Profile

Next.js App Router actor profile with a hybrid RSC/client layout:

- Edge-rendered actor route at `/en/actors/kashis-ray` and `/hi/actors/kashis-ray`.
- Server-fetched core data through `lib/actor-service.ts`, backed by a mock Firestore document source and policy checks.
- Timed stale-while-revalidate caching via `unstable_cache(..., { revalidate: 900, tags })`.
- On-demand revalidation through `POST /api/revalidate` with `x-revalidate-token`.
- Signed image delivery through `/api/image?src=...&sig=...` with immutable cache headers and priority LCP image hints.
- Client filmography explorer with `@tanstack/react-virtual`, filters for year, genre, role, and localized title search.
- Parallel route slots for awards, social, and similar actor panels.
- JSON-LD `Person` structured data and English/Hindi localized names, bios, titles, and character labels.
- Firestore security-rule template in `firestore.rules`, plus an app-level policy layer in `lib/policy.ts`.

## Run

```bash
npm run dev
```

Open `http://localhost:3000/en/actors/kashis-ray`.

## Revalidate

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "content-type: application/json" \
  -H "x-revalidate-token: $REVALIDATE_TOKEN" \
  -d '{"locale":"en","slug":"kashis-ray"}'
```

For local testing, set `REVALIDATE_TOKEN` and `IMAGE_SIGNING_SECRET` in `.env.local`.
