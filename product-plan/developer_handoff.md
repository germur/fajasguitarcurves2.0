# Developer Handoff - Guitar Curves

**Technical Stack**: Shopify (Backend/Checkout) + Astro/Liquid (Frontend)
**Priority**: Mobile-First (Sticky Bottom Navigation)

## 1. Data Configuration (Shopify Metafields)
To support the "Medical Hub" and "Guitar Tech" logic, implement the following custom fields on the Product entity:

**Namespace**: `faja_attrs`
- `recovery_stage` (Single Line Text): "Stage 1", "Stage 2", "Stage 3".
- `compression_level` (Single Line Text): "Media", "Alta", "Ultra-Alta".
- `body_type` (Single Line Text): "Guitar/BBL", "Standard", "Plus Size".
- `closure_type` (Single Line Text): "Cierre Lateral", "Broches Frontales", "Cierre Perineal".
- `pain_point` (List of Text): "FUPA Control", "Back Rolls", "Post-Lipo".

## 2. Navigation Architecture (App Shell)

### Mobile (Viewport < 768px)
- **Sticky Bottom Bar**: 5 items [Home, Shop (Drawer), Search (Overlay), Cart, Account].
- **Drawer Logic**: The "Shop" button must open a side drawer with the 5 main Silos, not navigate to a new page.

### Desktop (Viewport > 768px)
- **Mega Menu**: Implement visual menus for "Post-Surgery" and "Guitar Curves".
- **Top Bar**: Include "📍 Brooklyn Showroom" (Maps Link) and "🇺🇸 Free Shipping +$80".

## 3. Technical SEO Requirements (Agentic Ready)
- **Schema.org**:
    - `MerchantReturnPolicy` on all product pages.
    - `LocalBusiness` in footer with Brooklyn coordinates.
    - `SizeSpecification` on products to reduce returns.
