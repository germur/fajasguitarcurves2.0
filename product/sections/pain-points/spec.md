# Pain-Point Solutions (Virtual Silos)

## 1. Overview
**Goal:** Capture high-intent traffic searching for specific problem solutions (e.g., "how to hide fupa", "shapewear for hip dips") and funnel them to existing products via a "Visual Triage".
**Strategy:** "Don't sell the faja, cure the pain." This section acts as a diagnostic tool.

## 2. User Journey (The "Clinic" Flow)
1.  **Symptom Identification (Visual Triage):** User sees a body map or list of common "pain points".
2.  **The Diagnosis:** Click triggers a "Prescription" view (not just a collection page).
3.  **The Cure:** Curated products shown with specific "Why this works" copy relevant *only* to that pain point.

## 3. Core Features

### A. The "Visual Triage" (Interface)
*   **Concept:** A modern, respectful "Body Map" or clear, empathetic iconography.
*   **Categories (The "Big 4"):**
    1.  **FUPA Control** (Lower Belly pooch).
    2.  **Hip Dips** (Lack of hip volume).
    3.  **Back Rolls** (Bra bulge).
    4.  **Inner Thighs** (Chafing/Rubbing).

### B. "The Prescription" (Product Card Variant)
*   **Standard Card:** Shows Title & Price.
*   **Prescription Card:**
    *   **Headline:** "The Fix"
    *   **Mechanism:** "3-Layer Powernet Panel flattens lower abs without cutting circulation."
    *   **Visual Proof:** Zoom-in on the specific technical feature (e.g., the reinforced panel).

### C. "Doctor's Note" (Authority)
*   Small snippets of educational content next to the diagnosis.
*   *Example:* "Hip Dips are skeletal, not fat. You can't exercise them away, but you can fill them instantly."

## 4. Data Requirements (Virtual Collections)
We will map existing products to these virtual silos using Tags/Metafields logic.

| Pain Point | Trigger Tags | Key Feature to Highlight |
| :--- | :--- | :--- |
| **FUPA** | `Tummy Control`, `High Compression`, `Cierre Frontal` | "Reinforced Abdominal Panel" |
| **Hip Dips** | `BBL`, `Guitar Shape`, `Relleno` | "Side Volume Padding" |
| **Back Fat** | `Espalda Alta`, `Back Support`, `Corrector` | "High-Back Coverage" |
| **Thighs** | `Media Pierna`, `Pierna Larga`, `Cool Touch` | "Seamless Leg Finish" |

## 5. UI Components needed
*   `BodyMapTriage`: Interactive SVG or Image Map.
*   `ProblemCard`: High-contrast card for the triage menu.
*   `SolutionOverlay`: Modal or Slide-over showing the "Prescription".
