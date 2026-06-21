#!/usr/bin/env python3

from __future__ import annotations

import argparse
import shutil
from datetime import datetime
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont


SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Resize artwork images and apply a corner watermark for web display.",
    )
    parser.add_argument(
        "--source-dir",
        default="public/artworks",
        help="Directory containing artwork images to watermark.",
    )
    parser.add_argument(
        "--output-dir",
        default=None,
        help="Directory where processed images will be written. Defaults to source-dir.",
    )
    parser.add_argument(
        "--backup-root",
        default=".artwork-backups",
        help="Directory where original artwork files will be backed up.",
    )
    parser.add_argument(
        "--watermark",
        default="Sree Art",
        help="Watermark text to place in the lower-right corner.",
    )
    parser.add_argument(
        "--max-edge",
        type=int,
        default=1600,
        help="Maximum size for the longer edge of the exported web image.",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=88,
        help="JPEG/WebP export quality for the web image.",
    )
    parser.add_argument(
        "--brightness",
        type=float,
        default=1.0,
        help="Brightness multiplier. Use values above 1.0 to brighten slightly.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing backup directory if it somehow already exists.",
    )
    return parser.parse_args()


def get_font(font_size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for font_path in FONT_CANDIDATES:
        if Path(font_path).exists():
            return ImageFont.truetype(font_path, font_size)
    return ImageFont.load_default()


def build_backup_dir(backup_root: Path) -> Path:
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    return backup_root / f"artworks-{timestamp}"


def backup_images(source_dir: Path, backup_dir: Path) -> list[Path]:
    files = sorted(
        path for path in source_dir.iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    )
    backup_dir.mkdir(parents=True, exist_ok=False)
    for file_path in files:
        shutil.copy2(file_path, backup_dir / file_path.name)
    return files


def resize_image(image: Image.Image, max_edge: int) -> Image.Image:
    width, height = image.size
    longest = max(width, height)
    if longest <= max_edge:
        return image

    scale = max_edge / float(longest)
    resized = image.resize(
        (int(width * scale), int(height * scale)),
        Image.Resampling.LANCZOS,
    )
    return resized


def brighten_image(image: Image.Image, brightness: float) -> Image.Image:
    if brightness == 1.0:
        return image
    return ImageEnhance.Brightness(image).enhance(brightness)


def add_corner_watermark(image: Image.Image, watermark: str) -> Image.Image:
    rgba = image.convert("RGBA")
    overlay = Image.new("RGBA", rgba.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    width, height = rgba.size
    font_size = max(22, int(max(width, height) * 0.032))
    margin = max(18, int(max(width, height) * 0.03))

    font = get_font(font_size)
    bbox = draw.textbbox((0, 0), watermark, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = width - text_width - margin
    y = height - text_height - margin

    shadow_offset = max(1, font_size // 18)
    draw.text(
        (x + shadow_offset, y + shadow_offset),
        watermark,
        font=font,
        fill=(0, 0, 0, 95),
    )
    draw.text(
        (x, y),
        watermark,
        font=font,
        fill=(255, 255, 255, 150),
    )

    return Image.alpha_composite(rgba, overlay)


def save_image(
    image: Image.Image,
    destination: Path,
    quality: int,
    icc_profile: bytes | None,
) -> None:
    suffix = destination.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        image.convert("RGB").save(
            destination,
            format="JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
            icc_profile=icc_profile,
        )
        return
    if suffix == ".webp":
        image.save(
            destination,
            format="WEBP",
            quality=quality,
            method=6,
            icc_profile=icc_profile,
        )
        return
    if suffix == ".png":
        image.save(destination, format="PNG", optimize=True, icc_profile=icc_profile)
        return
    raise ValueError(f"Unsupported output format for {destination.name}")


def process_image(
    file_path: Path,
    destination: Path,
    watermark: str,
    max_edge: int,
    quality: int,
    brightness: float,
) -> None:
    with Image.open(file_path) as original:
        icc_profile = original.info.get("icc_profile")
        processed = resize_image(original, max_edge)
        processed = brighten_image(processed, brightness)
        watermarked = add_corner_watermark(processed, watermark)
        save_image(watermarked, destination, quality, icc_profile)


def main() -> None:
    args = parse_args()
    source_dir = Path(args.source_dir).resolve()
    output_dir = Path(args.output_dir).resolve() if args.output_dir else source_dir
    backup_root = Path(args.backup_root).resolve()

    if not source_dir.exists():
        raise SystemExit(f"Source directory not found: {source_dir}")
    output_dir.mkdir(parents=True, exist_ok=True)

    backup_dir = build_backup_dir(backup_root)
    if backup_dir.exists() and not args.force:
        raise SystemExit(f"Backup directory already exists: {backup_dir}")

    files = backup_images(source_dir, backup_dir)
    for file_path in files:
        destination = output_dir / file_path.name
        process_image(
            file_path,
            destination,
            args.watermark,
            args.max_edge,
            args.quality,
            args.brightness,
        )

    print(f"Backed up originals to: {backup_dir}")
    print(f"Processed {len(files)} artwork images from {source_dir} to {output_dir}")


if __name__ == "__main__":
    main()
