"use client";

import { useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Credit, Locale } from "@/lib/types";
import { t } from "@/lib/i18n";

type Props = {
  credits: Credit[];
  locale: Locale;
};

export default function FilmographyExplorer({ credits, locale }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState("all");
  const [genre, setGenre] = useState("all");
  const [role, setRole] = useState("all");
  const [query, setQuery] = useState("");

  const years = useMemo(() => Array.from(new Set(credits.map((credit) => credit.year))).sort((a, b) => b - a), [credits]);
  const genres = useMemo(() => Array.from(new Set(credits.map((credit) => credit.genre))).sort(), [credits]);
  const roles = useMemo(() => Array.from(new Set(credits.map((credit) => credit.role))).sort(), [credits]);

  const filteredCredits = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return credits.filter((credit) => {
      const matchesYear = year === "all" || credit.year === Number(year);
      const matchesGenre = genre === "all" || credit.genre === genre;
      const matchesRole = role === "all" || credit.role === role;
      const localizedTitle = t(credit.title, locale).toLowerCase();
      const altTitle = credit.alternateTitles.join(" ").toLowerCase();
      const matchesQuery = !normalizedQuery || localizedTitle.includes(normalizedQuery) || altTitle.includes(normalizedQuery);

      return matchesYear && matchesGenre && matchesRole && matchesQuery;
    });
  }, [credits, genre, locale, query, role, year]);

  // TanStack Virtual owns scroll measurement functions; this hook is intentionally client-only.
  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: filteredCredits.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 76,
    overscan: 8
  });

  return (
    <section className="explorer" aria-labelledby="filmography-heading">
      <div className="explorer-top">
        <div>
          <h2 id="filmography-heading">Filmography explorer</h2>
          <span className="muted">{filteredCredits.length} of {credits.length} credits</span>
        </div>
        <Search aria-hidden size={22} color="var(--accent)" />
      </div>
      <div className="filters">
        <label className="filter">
          <span>Year</span>
          <select value={year} onChange={(event) => setYear(event.target.value)}>
            <option value="all">All years</option>
            {years.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="filter">
          <span>Genre</span>
          <select value={genre} onChange={(event) => setGenre(event.target.value)}>
            <option value="all">All genres</option>
            {genres.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="filter">
          <span>Role</span>
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="all">All roles</option>
            {roles.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="filter">
          <span>Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title"
            inputMode="search"
          />
        </label>
      </div>
      <div ref={parentRef} className="virtual-list">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative"
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const credit = filteredCredits[virtualRow.index];

            return (
              <article
                className="credit-row"
                key={credit.id}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                <div className="credit-year">{credit.year}</div>
                <div>
                  <div className="credit-title">{t(credit.title, locale)}</div>
                  <div className="credit-meta">
                    {credit.genre} · {t(credit.character, locale)} · {credit.alternateTitles[0]}
                  </div>
                </div>
                <div className="role-pill">{credit.role}</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
