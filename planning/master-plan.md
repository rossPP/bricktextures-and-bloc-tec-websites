# Bloc-Tec Website Master Plan

## Overview

Create and launch a mobile-friendly website strategy centered on `bricktextures.com` as the public-facing hub brand, while retaining `bloc-tec.com` as the company/app/business-information domain.

## Locked Decisions

- Primary launch site: `bricktextures.com`
- Supporting company/app site: `bloc-tec.com`
- Integration implementation guidance/options live on `bloc-tec.com` (not on the initial `bricktextures.com` marketing experience).
- Public brand: `Brick Textures`
- Branded attribution: `Brick Textures by bloc-tec`
- Launch account slug target: `bricktextures` (currently `demo` until launch switch)
- Theme baseline:
  - primary `#008272`
  - text `#0b0b0b`
  - background `#ffffff`
  - Segoe-style font stack
- Light-first UI in v1, no switchable dark mode

## Commercial Model

- Hub inclusion can be free when suitable assets/data are supplied and onboarding capacity allows.
- Free hub inclusion does not grant rights to use Brick Textures assets/tools on manufacturer websites.
- Manufacturer website use is paid.
- Modules (for example blending/textures) can be visible on the hub but are paid add-ons for manufacturer website use.
- Assisted onboarding/photography support is paid when extra manual work is required.
- Launch with clear commercial structure; expand public pricing transparency post-launch.

## Manufacturer Onboarding Policy

- `Self-supplied route`: manufacturer supplies suitable imagery/data.
- `Assisted route`: paid support for onboarding, guidance, or photography-related help.
- `Deferred route`: postpone onboarding when suitable materials/commitment are not available.

## Page Priorities

1. Homepage (`/`)
2. For Manufacturers (`/for-manufacturers`)
3. FAQ (`/faq`)

## Build and UX Requirements

- Mobile-friendly from v1 (responsive layout, touch-friendly actions, readable typography).
- Homepage should prioritize fast category entry points over embedded iframe preview.
- Category launch buttons: Facing Bricks, Paving Blocks, and Paving Slabs (using `demo` placeholders until account names are finalized).
- Website copy should remain commercially clear and technically credible without public API/integration promises.
- Use FAQ in primary navigation instead of a generic contact nav item.
- Use manufacturer-only qualification checks on enquiry forms to reduce spam and non-target submissions.
- Include a visible link back to `bloc-tec.com` in primary navigation and footer.

## Next Phase: bloc-tec.com Basics

- Build a lightweight corporate/app information site for `bloc-tec.com`.
- Position this site for company profile, business information, and integration documentation.
- Keep `bricktextures.com` focused on vault usage and manufacturer onboarding.
- Add a `Who We Work With` credibility section on the bloc-tec homepage (logos/names, target audiences, trust messaging).
- Add dedicated real-world integration examples as part of the integration area:
  - recommended structure: `/integration` overview + `/integration/examples`
  - each example should include website link, implementation method, placement context, and short outcome notes.

## Deferred Tracking Todo

- Defer analytics implementation until after core content flow is finalized.
- Later add audience-role capture (for example Architect, Gamer, Hardscape Designer, Landscaper, Other) before vault access when tracking setup is ready.
- Skip popup feedback collection for now.

## Post-Launch Asset Todo

- Keep existing scene `.webp` files for launch to avoid blocking release work.
- Create a dedicated website display image tier for scene cards (lighter files for faster page load on `bloc-tec-site`).
- Keep viewer main scene files as `webp` and thumbnail/swatch assets as `jpg`.
- Standardize scene asset folder structure and naming so Photoshop Generate Assets can output directly to the target paths.

## Account Rename Note

- Rename `demo` to `bricktextures` when launch-ready.
- Share-link backward compatibility is not a launch blocker for this transition.

## Supporting Planning Docs

- `planning/content-outline.md`
- `planning/account-rename-checklist.md`
