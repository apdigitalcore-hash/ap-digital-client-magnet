#!/usr/bin/env bash
# Build the four hero derivatives for a city page.
#
#   scripts/make-city-hero.sh <source-image> <city-slug>
#
# Writes public/<slug>-night-{m750,1130,2260}.webp and -2260.jpg. The -2260
# file is capped at the source's own width — upscaling a generated image buys
# nothing — so the script prints the true width to pass as CityHero's
# wideWidth prop, keeping the srcSet descriptor honest.
set -euo pipefail

SRC=${1:?source image}
SLUG=${2:?city slug}
OUT=public
W=$(sips -g pixelWidth "$SRC" | awk '/pixelWidth/{print $2}')
WIDE=$(( W < 2260 ? W : 2260 ))

gen() { # width quality format ext
  npx -y sharp-cli@latest -i "$SRC" -o "$OUT/" --format "$3" --quality "$2" resize "$1" >/dev/null 2>&1
  mv "$OUT/$(basename "${SRC%.*}").$4" "$OUT/$SLUG-night-$5"
}

gen 750    78 webp webp m750.webp
gen 1130   76 webp webp 1130.webp
gen $WIDE  74 webp webp 2260.webp
gen $WIDE  80 jpeg jpg  2260.jpg

ls -la "$OUT/$SLUG-night-"* | awk '{print $5, $9}'
echo "wideWidth: $WIDE"
