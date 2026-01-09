# Section Specification: Lifestyle & Occasions (Boutique Engineering)

## Overview
Strategic Goal: Pivot from "Medical/Pain" to "Desire/Status". Position the product as a "Secret Weapon" for specific social occasions.
Key Insight: "The Job to be Done" is to look flawless in unforgiving fabrics (silk, satin) without discomfort.

## Key Features

### 1. "The Dress Test" (Dynamic Visualizer)
- **Format**: Video Loop / High-Quality GIF.
- **Scenario**: Model walking in a silk dress.
- **Comparison**:
    - *Before*: Visible Panty Lines (VPL), texture, fabric getting "stuck".
    - *After*: Guitar Curves Faja. Smooth glide, zero lines, perfect drape.
- **Insight**: Motion proves invisibility better than static photos.

### 2. "Comfort Meter" (Structured Data)
- **Problem**: "Will I suffocate?"
- **Solution**: A visual energy-bar indicator on product cards.
- **Metadata**: `usage_duration` enum:
    - "24 Hours (Second Skin)" -> Low/Med Compression.
    - "8-12 Hours (Office/Work)" -> Med/High Compression.
    - "4-6 Hours (Event/Gala)" -> Ultra Compression.

### 3. Shop by Occasion (Virtual Silos)
- **Bridal 💍**:
    - **Palette**: Ivory / Beige (#F5EDDF).
    - **Keywords**: "Low back", "Strapless", "Wedding dress".
- **Office 💼**:
    - **Palette**: Neutral / Soft Gray or White.
    - **Focus**: Posture correction, sitting comfort.
- **Date Night 🥂**:
    - **Palette**: Deep Espresso (#2C2420).
    - **Vibe**: Sexy, Lace details, "Snatched".

## Technical Handoff
- **Metafields**: `usage_duration`, `invisibility_level` (Seamless Tech).
- **Cross-Sell Logic**: Context-aware.
    - IF `Strapless` THEN suggest `Boob Tape`. (NOT Abdominal Board).

## Screen Designs Required
1. **Lifestyle Boutique View**: Main landing.
2. **Components**:
    - `DressTestVisualizer` (Video component).
    - `ComfortMeter` (Visual indicator).
    - `OccasionNav` (Themed cards).
