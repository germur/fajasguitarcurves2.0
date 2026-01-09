# One-Shot Prompt for Calvo Creativo OS (Guitar Curves)

You are an expert Senior Frontend Engineer and SEO Specialist. Your task is to build a high-performance E-commerce application called "Guitar Curves".

## Project Context
Guitar Curves is a specialized e-commerce brand for the US market, focusing on "Guitar Shape" body types and "BBL" post-surgery recovery. The goal is to be the #1 authority in this niche.

## Tech Stack
- **Framework**: Astro (for SEO performance) + React (for interactivity).
- **Styling**: Tailwind CSS v4.
- **State**: Nano Stores (lightweight).
- **CMS/Backend**: Shopify (Headless via Storefront API).

## Data Model & Architecture
You must strictly follow the Data Model defined in `data-model/data-model.md`.
- **Entities**: Product (Medical Logic + Guitar Tech), Collection (Physical + Virtual Silos), BlogPost.
- **Attributes**: Pay attention to `recoveryStage` (1,2,3) and `bodyType` (Guitar/Standard).

## Design System
- **Colors**: Use the Golden Sculpt Palette (`#A35944`, `#F5EDDF`, `#D1AB66`).
- **Typography**: Playfair Display (Headings) and Inter (Body).
- **UX**: Follow the Shell Spec (`shell/spec.md`) specifically the "Tower of Control" header and "Thumb-Friendly" mobile bar.

## Implementation Steps
1. **Setup**: Initialize Astro project with Tailwind v4 and React.
2. **Design Tokens**: Implement `colors.json` and `typography.json`.
3. **Components**: Build the atomic components (Buttons, Badges, Cards).
4. **Shell**: Implement the Header (MegaMenu) and Mobile Bottom Bar.
5. **Pages**:
   - Home (Hero, Silos Grid).
   - Collection Template (Filtering by Medical Logic).
   - Product Page (Rich specs, Recovery attribute display).
   - Academy (Blog Index).
6. **SEO**: Implement Schema.org for LocalBusiness and Product.

## Trust & Quality
- Ensure all text contrasts meet WCAG AA.
- Use `aria-labels` for all navigation.
- Optimize images for Core Web Vitals (LCP).

Start by initializing the project structure.
