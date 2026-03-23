import React from 'react';

type Props = { children: React.ReactNode };

// MinimalLayout guarantees no header, no footer on this route
export default function MinimalLayout({ children }: Props) {
  return <div className="min-layout">{children}</div>;
}
