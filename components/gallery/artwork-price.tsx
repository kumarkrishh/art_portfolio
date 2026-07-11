"use client";

import { useArtworkSelection } from "./artwork-selection-context";

const FRAME_PRICE = 15;

type ArtworkPriceProps = {
  basePrice: number;
  isUnavailable: boolean;
  unavailableLabel: string;
};

export function ArtworkPrice({
  basePrice,
  isUnavailable,
  unavailableLabel,
}: ArtworkPriceProps) {
  const { selectedLabel } = useArtworkSelection();

  if (isUnavailable) {
    return <span className="italic text-zinc-500 font-normal">{unavailableLabel}</span>;
  }

  const includesFrame = selectedLabel !== "Canvas only";
  const totalPrice = basePrice + (includesFrame ? FRAME_PRICE : 0);

  return (
    <>
      <span>${totalPrice}</span>
      <span className="mt-1 block text-xs font-normal text-zinc-500">
        {selectedLabel}
      </span>
    </>
  );
}
