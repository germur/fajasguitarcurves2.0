# Section Specification: Guitar Curves Signature (The Look)

## Overview
Strategic Goal: Demonstrate engineering superiority to the "Shapewear Enthusiast" and "BBL Veteran". Prove that Guitar Curves solves the "gap in the back" problem without flattening glutes.

## Key Features

### 1. "Snatched vs. Flattened" Visualizer (Interactive)
- **UI Pattern**: Before/After Image Slider.
- **Left (Problem)**: "Standard Fit" showing waist gap and flattened butt.
- **Right (Solution)**: "Guitar Tech™ Fit" showing cinched waist and projected glutes.
- **Interaction**: Drag handle reveals the difference with tooltips ("See the gap disappear").

### 2. "No-Fail" Ratio Calculator (Modal)
- **Inputs**: Waist and Hip measurements.
- **Logic**: If (Hip - Waist) > 10 inches -> Recommend "Guitar Fit". Else -> "Standard Fit".
- **Gamification**: Visual body shape morphing as inputs change.

### 3. Specialized Collections (Bento Grid)
- **The Hourglass Effect**: Daily wear, high compression, invisible seams. (Lifestyle vibe).
- **BBL Shorts**: "Butt Lifter" focus. Tech highlight: Open Butt/Thin Mesh vs Powernet waist.
- **Plus Size Curvy**: "Same Geometry, Larger Scale" (3XL-6XL). Avoids "scaled up standard" trap.

## Screen Designs Required

### 1. Signature Collection View
- **Hero**: "Stop Sizing Up for Your Hips". Video background of diverse "Guitar" shapes. CTA: "Calculate Your Ratio".
- **Visualizer Section**: Full-width interactive slider.
- **Product Grid**: Bento layout. Sticky filter bar (Compression, Body Goal).
- **Cards**: Hover reveals technical view (rod placement). Tags: "High Back", "Silicone Lace".

### 2. Fit Guide Modal
- **Header**: "The Ratio Test".
- **Video**: Loop showing how to measure.
- **Result**: "You are a Guitar Curve" + Size Recommendation/Why.

## Technical Handoff
- **Metafields**: `hip_capacity` (High/Ultra), `butt_lift_level` (Natural/Invisible), `back_height`.
- **Logic**: JS Ratio Calculator.
- **Assets**: Custom SVG icons for "Silicone Lace" (wavy) and "High Back" (arrow).
