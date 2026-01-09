# Application Shell Specification

## 1. Header (La Torre de Control)
**Objective**: Reduce cognitive load via "Smart Navigation".
**Visuals**: Background White (`#FFFFFF`), Text/Borders Deep Espresso (`#2C2420`).

### A. Top Bar (Trust & Urgency)
- **Background**: Deep Espresso (`#2C2420`) | **Text**: White (`#FFFFFF`)
- **Left (Local SEO)**: "📍 Visit our Brooklyn Showroom | Expert Fittings" (Link to GMap)
- **Center (Value)**: "🇺🇸 Free Shipping on US Orders +$80 | Made in Colombia"
- **Right (Utility)**: "Track Order" | Language Toggle (ES/EN)

### B. Main Navigation (Desktop Mega Menus)
**Structure**:
1. **POST-SURGERY (Medical Hub)** - Badge: "Doctor Recommended"
   - **Shop by Stage**: Stage 1 (Immediate), Stage 2 (Sculpting - 🔥 Best Seller), Stage 3 (Maintenance)
   - **Shop by Surgery**: BBL Recovery (Gluteos Libres), Lipo 360, Arm Lipo
   - **Supplies**: Lipo Foams & Boards, Arnica Tea (Viveltex Technology)
   
2. **GUITAR CURVES (Signature Collection)**
   - **Focus**: "Cintura pequeña / Cadera grande"
   - **Links**: The Hourglass Effect, BBL Shorts (Ultra Realce), Hip Dips Solutions, Plus Size Curvy (3XL-6XL)
   - **Visual**: "Standard Fit vs. Guitar Fit" comparison
   
3. **DAILY USE (Lifestyle)**
   - Strapless & Dress Fajas (Invisible Tech)
   - Waist Trainers (Cinturillas)
   - Postpartum & Mommy Makeover (Market Gap)
   - Leggings & Activewear
   
4. **SOLUTIONS (Virtual Silos / Pain Points)**
   - FUPA Control
   - Back Rolls
   - Posture Corrector
   - Short vs Long Torso
   
5. **ACADEMY (Content)**
   - Quiz: Find Your Size
   - Recovery Timeline
   - Real Results Gallery

**Actions**:
- **Search**: Predictive (suggests "Lipo", "Stage 2").
- **Cart**: Smart Drawer (Slide-out).

---

## 2. Footer (Trust Basement & Agentic SEO)
**Visuals**: Background Surgical Sage (`#7A9CA3`).

**Columns**:
1. **Brand & Trust**: Logo, "Medical Grade Compression", Seals (Doctor Approved, SSL, Easy Returns).
2. **Shop by Body Type (SEO)**: Hourglass, Pear, Apple, Rectangle (Internal linking).
3. **Customer Care**: Track Order, Returns & Exchanges, Size Guide Video, Book Virtual Fitting.
4. **Contact & Local**: "Guitar Curves Brooklyn Showroom", Full Address, Hours, Floating WhatsApp Button.

---

## 3. Mobile UX (Thumb-Friendly)
**Strategy**: Sticky Bottom Bar (No collapsed top menu).

**Bottom Bar Items**:
1. **Home**
2. **Shop** (Opens Drawer with Categories)
3. **Search** (Fullscreen)
4. **Cart** (Total $ visible)
5. **Account**

---

## 4. Technical Requirements
1. **Schema.org/NavigationElement**: For main menu structure.
2. **Schema.org/LocalBusiness**: JSON-LD in footer with specific Brooklyn coordinates.
3. **Schema.org/MerchantReturnPolicy**: Machine-readable return rules for AI agents.
4. **ARIA Labels**: `aria-expanded`, `aria-label` for all toggles and menus.
