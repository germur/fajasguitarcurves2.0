# Gap Analysis: Live Store vs Design OS

## Executive Summary
**Integrity Score: 85% Match**
The live store `fajasguitarcurves.com` has an architecture that aligns surprisingly well with our proposed "Silo Strategy". The main gap is **Technical Structure** (Tags vs Metafields), not Strategic.

## 1. Silo Alignment (Success)
| Design OS Silo | Live Collection Found | Status |
| :--- | :--- | :--- |
| **Medical Hub** | `post-operatoria` (Handle: `post-operatoria`) | ✅ Match |
| **Guitar Curves** | `Reloj de arena` (Handle: `reloj-de-arena`) | ✅ Match |
| **Lifestyle** | `Uso diario` (Handle: `uso-diario`) | ✅ Match |

**Insight**: You already have the physical silos created. We just need to point our Frontend Routers to these existing handles.

## 2. Data Structure Gap (Tags vs Metafields)
Our designs (Recovery Stage Selector, Comfort Meter) expect structured data. Your store currently relies on "Flat Tags".

| Feature | Design OS Expectation | Live Store Reality | Proposed Fix (Mapping) |
| :--- | :--- | :--- | :--- |
| **Stage Logic** | `recoveryStage: "Stage 2"` | Tag: `Etapa 2` | **Map Tag -> Prop**: `if tag.includes('Etapa 2') return 'Stage 2'` |
| **Comfort Meter** | `usageDuration: "8 Hours"` | Tag: `Daily Use` | **Map Tag -> Prop**: `if tag.includes('Daily Use') return '8-12 Hours'` |
| **Body Type** | `bodyType: "Guitar"` | Collection: `Reloj de arena` | Use Collection membership as logic. |

## 3. Missing Critical Data
These attributes are **NOT** found in your current data and are required for the "Killer Features":
1.  **"Butt Lift Level"**: (Natural vs Ultra). Needed for Guitar Curves differentiation.
2.  **"Invisibility Level"**: Needed for Lifestyle "Dress Test".
3.  **"Compression Level"**: Partially exists in tags (`High Compression`), but needs standardizing.

## Recommendation
**Do NOT re-platform.**
We will create a `ShopifyMapper` utility in the frontend code.
1.  **Phase 1 (Soft Launch)**: Use existing Tags to drive the UI.
2.  **Phase 2 (Optimization)**: Create specific Metafields only for the missing critical data (Butt Lift, Invisibility).
