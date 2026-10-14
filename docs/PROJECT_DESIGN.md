# Anime Studio — Project Design

## Editor Layout
The editor follows a professional dock-based model:

- **Top menu/toolbar:** project and production commands.
- **Left Tool Dock:** drawing and viewport tools.
- **Center Viewport:** current drawing/frame/scene.
- **Right Details Dock:** context-sensitive project, guide, generator, asset, and storyboard information.
- **Content Browser:** reusable assets and instructional content.
- **Bottom Timeline:** frames, timing, and future animation tracks.
- **Status Bar:** active tool, brush settings, frame, and workspace state.

## Project Model
Project → Scene → Shot → Frame → Layer.

A project may also contain Characters, Assets, Guides, Storyboard Panels, Audio references, and Export Presets.

## Drawing Model
Each frame is composed from ordered layers. Recommended layer roles:
1. Construction
2. Sketch
3. Clean Line
4. Flats
5. Shadows
6. Highlights
7. Effects
8. Background

## Guide Model
A guide contains:
- subject
- category
- style family
- difficulty
- prerequisites
- ordered steps
- reference diagrams
- practice prompts
- asset links

## Content Browser
Every asset should carry:
- name
- category
- tags
- style family
- source/provenance
- license
- creator
- dimensions
- file type
- preview URI
- full asset URI

This makes the library suitable for original, licensed, public-domain, and user-created resources without confusing ownership or provenance.

## API Boundary
Browser → HTTPS REST API → Node.js/Express → MySQL/Object Storage.

The browser must never receive database credentials.

## Design Principle
The application should teach the artist how to construct an image while also providing production tools for turning that image into an animated scene.


## Hybrid 2D-in-3D Anime Architecture

The production target is a hybrid 2D/3D anime studio: artwork remains primarily 2D, while scenes are staged and rendered in a 3D coordinate space.

### Asset Philosophy
- Characters: 2D painted/vector artwork, cutout parts, sprites, or texture cards.
- Props: 2D illustrations mapped to planes or layered cards.
- Backgrounds: painted 2D plates, layered depth cards, or panoramic textures.
- FX: 2D particles, animated texture cards, hand-drawn effects and composited overlays.
- UI and manga elements: 2D screen-space layers.

### 3D Stage
- X/Y/Z scene coordinates.
- 3D camera with perspective/orthographic modes.
- Camera pan, orbit, dolly, zoom, roll and shake.
- Depth sorting and parallax.
- Multi-plane 2.5D staging.
- Optional 3D lighting for depth-aware 2D cards.
- Fog/depth atmosphere where appropriate.
- Scene bookmarks and camera presets.

### Anime Rendering Direction
The renderer should favor a stylized anime presentation rather than photorealism:
- Controlled cel-style lighting.
- High-contrast shadow shapes.
- Saturated but managed palette.
- Dark/cool environmental bases with warm accent colors.
- Rim-light and silhouette emphasis.
- Hand-painted texture overlays.
- Bloom/glow used selectively.
- Screen tones, speed lines and impact FX remain 2D.
- Per-layer color grading.

The visual direction is an original hybrid anime aesthetic inspired by modern streaming animation, without copying a specific show's proprietary artwork, models, characters or branding.

### Production Modes
1. **2D Canvas Mode** — draw and paint directly.
2. **2D Cutout Mode** — separate character/prop parts for reusable animation.
3. **2.5D Stage Mode** — place 2D assets at different depths.
4. **3D Stage Mode** — use 2D cards and optional simple 3D geometry.
5. **Composite Mode** — combine render passes, FX, dialogue, music and final color grade.

### Rendering Pipeline
Source Art → Asset Preparation → 2D/3D Stage → Camera → Lighting/Depth → 2D FX → Composite → Color Grade → Audio Mix → Final Render.
