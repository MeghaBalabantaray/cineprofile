const encoder = new TextEncoder();

async function hmac(secret: string, value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function signImagePath(path: string) {
  const secret = process.env.IMAGE_SIGNING_SECRET ?? "local-dev-image-secret";
  const sig = await hmac(secret, path);
  return `/api/image?src=${encodeURIComponent(path)}&sig=${sig}`;
}

export async function verifyImageSignature(path: string, sig: string) {
  const expected = await hmac(process.env.IMAGE_SIGNING_SECRET ?? "local-dev-image-secret", path);
  return expected === sig;
}
