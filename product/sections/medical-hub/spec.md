# Section Specification: Medical Hub (Post-Surgery)

## Overview
The **Medical Hub** is the core transactional engine of Guitar Curves. It guides post-operative patients through their recovery journey (Stage 1 -> Stage 2 -> Stage 3). This section must balance "Medical Authority" with "E-commerce Conversion".

## User Stories
1. **The Anxious Patient**: "I just had surgery and I'm terrified of ruining my results. I need to know exactly which faja is for 'Stage 1' and I need it fast."
2. **The Surgeon's Referral**: "My doctor told me to buy a Stage 2 High Compression faja with side zippers."

## Key Requirements

### 1. Stage-Based Navigation (The Funnel)
- **Top Level**: Clear tabs or toggle for "Stage 1 (Immediate)", "Stage 2 (Sculpting)", "Stage 3 (Maintenance)".
- **Visual Cues**: Each stage must have a distinct icon/badge color or description explaining *when* to use it (e.g., "Weeks 1-4").

### 2. Filters & Attributes (Medical Logic)
- **Compression**: Filter by Media, Alta, Ultra-Alta.
- **Surgery Type**: BBL (No butt compression), Lipo 360, Tummy Tuck.
- **Closure**: Side Zipper vs Hooks (critical for comfort).

### 3. Educational Components (Trust)
- **Recovery Timeline**: A visual component showing the user where they are in their journey.
- **"Why This Stage?"**: Tooltips or fast-facts explaining the medical necessity of the selected stage.

## Screen Designs Required
1. **Medical Hub Dashboard (Collection View)**:
   - Hero: "Your Recovery Partner" with verified trust badges.
   - Stage Selectors: Large, clickable cards for Stages 1, 2, 3.
   - Product Grid: Filterable list of fajas with rich attributes (badges).

2. **Quick View / Product Card**:
   - Must show "Best for: BBL/Lipo" prominently.
   - "How to Measure" trigger.
