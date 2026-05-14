import type { Actor } from "./types";

export type Viewer = {
  uid?: string;
  roles: Array<"public" | "editor" | "admin">;
};

export const publicViewer: Viewer = { roles: ["public"] };

export function canReadActor(viewer: Viewer, actor: Actor) {
  return Boolean(actor.slug) && viewer.roles.includes("public");
}

export function canRevalidate(viewer: Viewer) {
  return viewer.roles.includes("admin") || viewer.roles.includes("editor");
}
