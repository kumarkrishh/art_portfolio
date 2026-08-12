"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { useArtworkSelection } from "./artwork-selection-context";

type BuyArtworkButtonProps = {
  artworkId: string;
  artworkTitle: string;
};

export function BuyArtworkButton({
  artworkId,
  artworkTitle,
}: BuyArtworkButtonProps) {
  const { selectedLabel } = useArtworkSelection();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const resetCheckoutState = () => {
      setIsLoading(false);
      setError("");
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resetCheckoutState();
      }
    };

    window.addEventListener("pageshow", resetCheckoutState);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pageshow", resetCheckoutState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const startCheckout = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artworkId, selectedLabel }),
      });
      const result = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.error ?? "Unable to start checkout.");
      }

      track("checkout_started", {
        artworkId,
        artworkTitle,
        option: selectedLabel,
      });
      window.location.assign(result.url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout. Please try again.",
      );
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={isLoading}
        className="w-full rounded-full border border-zinc-900 bg-zinc-900 py-4 text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-zinc-800 disabled:cursor-wait disabled:bg-zinc-600"
      >
        {isLoading ? "Opening secure checkout…" : "Buy Now"}
      </button>
      {error ? (
        <p role="alert" className="mt-3 text-center text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
