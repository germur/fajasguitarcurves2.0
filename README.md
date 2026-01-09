# Fajas Guitar Curves OS

**Project Status:** Expansion Phase Complete
**Last Updated:** January 2026

## Overview
This repository contains the "Design OS" for Calvo Creativo, a comprehensive specialized e-commerce framework positioned as a "Post-Op Recovery Institute". It features 5 strategic pillars designed to increase authority, specific solution targeting, and local SEO.

## Strategic Sections (Silos)

1.  **Medical Hub (`src/sections/medical-hub`)**
    *   **Goal:** Authority & Surgeon Trust.
    *   **Features:** Recovery Stages (1, 2, 3), Medical-grade filtering.
    *   **Data Source:** Shopify Products (mapped via Tags).

2.  **Guitar Curves (`src/sections/guitar-curves`)**
    *   **Goal:** Brand Signature & Aesthetics.
    *   **Features:** Shape targeting (BBL, Pear, Hourglass).
    *   **Data Source:** Shopify Products.

3.  **Lifestyle (`src/sections/lifestyle`)**
    *   **Goal:** Daily Use & Comfort.
    *   **Features:** "Secret Weapons", Comfort Meter, Dress Test.
    *   **Data Source:** Shopify Products.

4.  **Pain-Point Solutions (`src/sections/pain-points`)**
    *   **Goal:** Problem/Solution Targeting.
    *   **Features:** Visual Triage (FUPA, Hip Dips, etc.), "Medical Prescriptions".
    *   **Data Source:** Virtual mapping of existing Shopify inventory.

5.  **The Institute (`src/sections/academia`)**
    *   **Goal:** SEO & Education.
    *   **Features:** Recovery Manuals (Blog), Local Provider Directory.
    *   **Data Source:** `product/sections/academia/data.json` (Sample Data).

## Key Commands

### Development
```bash
npm run dev
# Server usually runs on http://localhost:5173 or http://localhost:3000
```

### Data Synchronization
Syncs real product data from the Shopify Store (`fajasguitarcurves.com`) into the local JSON data layer.
```bash
node scripts/sync-store-data.js
```
*Note: Requires valid Storefront API Token in the script.*

## Project Structure

*   `src/sections/`: Contains the React source code for each specific view.
*   `product/sections/`: Contains the `data.json` files and `spec.md` design requirements.
*   `src/lib/shopify-mapper.ts`: Logic for translating Shopify tags into Design OS properties.
*   `GAP_ANALYSIS.md`: Documentation of the data mapping strategy.
