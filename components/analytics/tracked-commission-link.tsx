"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

type TrackedCommissionLinkProps = {
  href: string;
  artworkId?: string;
  artworkTitle?: string;
  source: string;
  className?: string;
  children: ReactNode;
};

export function TrackedCommissionLink({
  href,
  artworkId,
  artworkTitle,
  source,
  className,
  children,
}: TrackedCommissionLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        track("commission_cta_clicked", {
          source,
          artworkId,
          artworkTitle,
        })
      }
    >
      {children}
    </Link>
  );
}
