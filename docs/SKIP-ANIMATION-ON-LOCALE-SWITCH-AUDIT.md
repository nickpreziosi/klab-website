# Skip-animation-on-locale-switch audit

When the user switches locale (e.g. EN → ES on the same page), entrance animations are skipped so content appears immediately. The flag is set in the locale switcher before `router.push` and cleared when the pathname changes (so only that page skips; the next page animates).

## Pages/views already wired

These views call `useSkipAnimationOnLocaleSwitch()` and pass `skipAnimation` to their animated children:

| View | Location | Notes |
|------|----------|--------|
| **HomeView** | `src/ui/home/views/HomeView/` | Uses hook + `hasAnimated` from HomeAnimationProvider |
| **CompanyView** | `src/ui/company/views/CompanyView/` | Passes to hero, timeline, manifesto, foundation, culture, staff |
| **ContactView** | `src/ui/contact/views/ContactView/` | Passes to SectionHeader and ContactLinks |
| **NewsView** | `src/ui/news/views/NewsView/` | Passes to hero motion, ContactLinks, no-results |
| **Technology pages** | All under `src/ui/technology-page/views/` | Kabl, KAxis, KBpm, KCard, KLeads, KRisk, KTalk, Kim, Kai, TechnologyPlaceholderView – all pass to TechnologyPageLayout |
| **KenaView** | `src/ui/kena/views/KenaView/` | Passes to hero, cards, 3d, CTA sections |
| **KRailsView** | `src/ui/krails/views/KRailsView/` | Passes to hero, code section, why, built-with, CTA |

## Pages/views with no entrance animations

- **FoundationView** – Static content only; no motion.
- **LitepapersView** – Static content; no motion.

## Pages/components to consider

| Page / component | Notes |
|------------------|--------|
| **Landing page** | Uses `LandingAnimationProvider` / `useLandingAnimation()` (similar to home). If locale switch is possible on landing, consider calling `setSkipAnimationsOnNextPageLoad()` from the landing locale switcher (already done) and using `useSkipAnimationOnLocaleSwitch()` in the landing view so that view skips animations. |
| **ArticleView** (news article) | Uses motion (e.g. gallery, UI). If users can switch locale on an article, add `useSkipAnimationOnLocaleSwitch()` in ArticleView and pass `skipAnimation` to animated children. |
| **NewsCard** | Used in NewsView; has motion (e.g. stagger). NewsView has `skipAnimation` but does not pass it to `NewsCard`. Optional: add `skipAnimation` prop to NewsCard and pass from NewsView for consistent behavior. |
| **Kena case study / KRails case study** | Carousel / interactive panels; mostly reaction to user selection. Left as-is unless you want to skip initial entrance of the first slide. |

## Shared components that accept `skipAnimation`

These already support a `skipAnimation` prop and are used by views above:

- `SectionHeader`
- `HeroText`
- `VideoPlayer`
- `ContactLink`
- `CompanySectionTitle`
- `TechnologyPageLayout`

## Where the flag is set

- `locale-switcher.tsx` – desktop nav
- `mobile-locale-switcher.tsx` – mobile drawer
- `landing-locale-switcher.tsx` – landing page

All call `setSkipAnimationsOnNextPageLoad()` next to `saveScrollBeforeLocaleSwitch()` before `router.push(..., { locale, scroll: false })`.

## Optional follow-ups

1. **ArticleView** – Wire `useSkipAnimationOnLocaleSwitch()` and pass `skipAnimation` to any motion components that are entrance-only.
2. **NewsCard** – Add optional `skipAnimation` prop and pass it from NewsView for list entrance.
3. **Landing page** – Ensure landing content uses `useSkipAnimationOnLocaleSwitch()` (or equivalent) so that after a locale switch on landing, animations are skipped on that load.
