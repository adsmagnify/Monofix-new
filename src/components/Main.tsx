import type { ReactNode } from "react";

export function Main({ children, padded }: { children: ReactNode; padded?: boolean }) {
  return (
    <main
      id="main"
      style={padded ? { paddingTop: "var(--header-h, 7.5rem)" } : undefined}
    >
      {children}
    </main>
  );
}
