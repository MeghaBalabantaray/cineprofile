import type { ReactNode } from "react";

type ActorLayoutProps = {
  children: ReactNode;
  awards: ReactNode;
  social: ReactNode;
  similar: ReactNode;
};

export default function ActorLayout({ children, awards, social, similar }: ActorLayoutProps) {
  return (
    <main className="shell">
      <div className="profile-grid">
        <div className="content-stack">{children}</div>
        <aside className="side-panels" aria-label="Actor subpanels">
          {awards}
          {social}
          {similar}
        </aside>
      </div>
    </main>
  );
}
