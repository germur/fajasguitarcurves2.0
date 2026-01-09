# Data Model

This document defines the core entities and relationships for Calvo Creativo OS (Guitar Curves). It is designed to support "Agentic Commerce" via structured data and hyper-specialization for the BBL/Post-Op niche.

## Entities

### 1. Product (The Core)
Represents the physical inventory. Enriched with specific medical and morphological metadata to support granular filtering and AI recommendations.

**Attributes:**
- `id`: Unique Identifier (UUID)
- `sku`: Stock Keeping Unit (String)
- `title`: Product Name (H1 optimized, e.g., "Stage 2 Hourglass Faja with Bra")
- `description`: Full HTML description focused on benefits (BLUF)
- `price`: Decimal
- `images`: Array of Image Objects (Url, AltText optimized for SEO)

**Medical Logic (Recovery Attributes):**
- `recoveryStage`: Enum ["Stage 1", "Stage 2", "Stage 3"] - Critical for recovery funnel.
- `compressionLevel`: Enum ["Media", "Alta", "Ultra-Alta"]
- `material`: Enum ["Powernet", "Lycra Fría", "Bidireccional"]

**Guitar Tech (Morphology Attributes):**
- `bodyType`: Enum ["Guitar/BBL", "Standard", "Plus Size"]
- `buttLiftLevel`: Enum ["Natural", "Ultra Realce", "Invisible"]
- `closureType`: Enum ["Lateral", "Frontal", "Hooks", "Zipper"] - Vital for usability.

**Pain-Point Solutions:**
- `problemSolved`: Array of Strings (e.g., ["FUPA Control", "Rollitos Espalda", "Diástasis", "BBL Pillow Compatible"])

---

### 2. Collection (The Architecture)
Distinguishes between hierarchical navigation and virtual groupings for SEO silos.

**Attributes:**
- `id`: Unique Identifier
- `title`: Collection Name (e.g., "Fajas Post-Quirúrgicas")
- `type`: Enum ["Physical", "Virtual"]
    - *Physical*: Hard silos (e.g., Post-Op > Stage 2)
    - *Virtual*: Dynamic groups based on tags (e.g., "FUPA Solutions")
- `description`: SEO optimized description for the category page
- `products`: Relationship -> List of `Product` IDs

---

### 3. BlogPost (E-E-A-T Authority)
Educational content to build trust and authority. Tightly coupled with products for commerce-content strategy.

**Attributes:**
- `id`: Unique Identifier
- `title`: Article Headline
- `slug`: SEO friendly URL path
- `content`: Markdown content
- `category`: Enum ["Guía de Tallas", "Tips de Recuperación", "Comparativas", "Lifestyle"]
- `authorExpertise`: Enum ["Enfermera", "Especialista Post-Op", "Brand Expert"] - Validates E-E-A-T.
- `relatedProducts`: Relationship -> List of `Product` IDs (Contextual commerce)

---

### 4. StoreLocation (Local SEO)
Physical presence points to capture "near me" intent.

**Attributes:**
- `id`: Unique Identifier
- `name`: Store Name (e.g., "Guitar Curves Brooklyn Showroom")
- `address`: Full physical address
- `geoCoordinates`: Object { lat, long } - For Local Schema
- `phone`: Contact number
- `openingHours`: String/Object structure
- `servicesOffered`: Array ["Fitting Personalizado", "Store Pickup", "Alterations"]

## Relationships

- Collection has many Products
- BlogPost has many RelatedProducts
- Product belongs to many Collections

---



## Technical Notes for Implementation
- **Schema.org Mapping**: All `Product` attributes map to `Product` schema. `recoveryStage` and `bodyType` should be mapped as `additionalProperty`.
- **Metafields**: In Shopify, `Medical Logic` and `Guitar Tech` attributes will be implemented as custom Metafields.
