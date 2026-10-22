# Spectrum 2026–27 supplied artwork manifest

The following artwork was supplied by the project owner in `Spectrum_Event_Images_and_Shield.zip`. The website uses these local files; it does not hotlink to remote image hosts. The source ZIP originals are preserved byte-for-byte in the project.

| Event | Local asset | Used in |
|---|---|---|
| ON THE SPOT | `assets/events/02_ON_THE_SPOT.jpg` | Event card, preview modal, full detail banner |
| RUSH 1V1 | `assets/events/03_RUSH_1V1.jpg` | Event card, preview modal, full detail banner |
| THE CURSE OF TUMBBAD | `assets/events/06_THE_CURSE_OF_TUMBBAAD.jpg` | Event card, preview modal, full detail banner |
| FORGE | `assets/events/04_FORGE.jpg` | Event card, preview modal, full detail banner |
| RANGREZZA | `assets/events/05_RANGREZZA.jpg` | Event card, preview modal, full detail banner |
| MEHENDI MANIA | `assets/events/01_MEHENDI_MANIA.jpg` | Event card, preview modal, full detail banner |
| Spectrum shield | `assets/brand/SPECTRUM_SHIELD_3D_TRANSPARENT.png` | Opening cinematic, main 3D hero, header and footer brand marks |

## Single source of truth

Each event's `image` property is defined once in `content/site-data.js`. `script.js` reads that property for all three event image placements. The file named `06_THE_CURSE_OF_TUMBBAAD.jpg` retains the exact filename provided in the supplied archive.

## Source and rights note

These are user-supplied project assets, not images downloaded from Unsplash, Pexels, Pixabay, or another external stock source. No third-party stock license or attribution claim is made here. The project owner should retain any original rights/permissions associated with the supplied artwork.

## Image handling

- Original supplied JPG and PNG files are kept intact.
- Event card covers use a consistent crop with per-image focal positioning.
- Modal and detail banners use the same source image and contain portrait artwork without stretching it.
- Event image load failures are logged in the browser console and replaced with a visible error state rather than a blank banner.
- The official shield PNG is used as-is; visual lighting is applied with CSS outside the source artwork.
