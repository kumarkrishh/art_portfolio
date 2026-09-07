"use client";

import type { ArtworkDetailImage } from "@/lib/artwork-images";
import { useArtworkSelection } from "./artwork-selection-context";

const FRAME_PRICE_DOLLARS = 15;

type ArtworkFrameSelectorProps = {
  options: ArtworkDetailImage[];
  disabled?: boolean;
};

function getDisplayLabel(option: string) {
  if (option === "Canvas only") return "Canvas only";
  return option.replace(" frame", "");
}

export function ArtworkFrameSelector({
  options,
  disabled = false,
}: ArtworkFrameSelectorProps) {
  const { selectedLabel, setSelectedLabel } = useArtworkSelection();

  if (options.length <= 1) return null;

  return (
    <fieldset disabled={disabled}>
      <legend className="sr-only">Frame</legend>
      <div className="mb-3 flex items-end justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-900">
          Frame
        </span>
        <span className="text-xs text-zinc-400">Select a finish</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5" role="radiogroup" aria-label="Frame type">
        {options.map((option) => {
          const isSelected = selectedLabel === option.label;

          return (
            <button
              key={option.label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => setSelectedLabel(option.label)}
              className={`relative flex min-h-20 flex-col items-center justify-center gap-1.5 rounded-sm px-2 py-3 text-center transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                isSelected
                  ? "bg-[#EEEAE4]"
                  : "bg-[#F9F8F6] hover:bg-[#F3F1ED]"
              }`}
            >
              {isSelected ? (
                <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] leading-none text-white" aria-hidden="true">
                  ✓
                </span>
              ) : null}
              <span className="text-xs font-medium text-zinc-800">
                {getDisplayLabel(option.label)}
              </span>
              <span className="text-[11px] text-zinc-400">
                {option.label === "Canvas only" ? "Included" : `+$${FRAME_PRICE_DOLLARS}`}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
