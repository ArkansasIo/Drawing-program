# Anime Studio Catalog

## Editor
- Viewport
- Tool Dock
- Project panel
- Details/Generator panel
- Content Browser
- Animation Timeline
- Storyboard
- Image FX

## Drawing Tools
- Pencil
- Ink
- Marker
- Airbrush
- Eraser
- Fill
- Brush size
- Opacity
- Color picker
- Palette
- Undo/Redo
- PNG export

## How-to Library
### Characters
Head & face; eyes; noses & mouths; hair; ears; hands; feet; anatomy; poses; gestures; expressions; ages/proportions; chibi; character design.

### Clothing
School uniforms; casual clothing; fantasy armor; kimono/yukata; dresses; shoes; accessories; folds/fabric.

### Creatures
Animals; fantasy creatures; dragons; monsters; robots; mecha; birds; aquatic creatures.

### Buildings
Japanese houses; apartments; schools; shrines/temples; castles; fantasy buildings; streets; stores/cafes; skyscrapers; industrial buildings.

### Environments
Mountains; forests; beaches; rivers; urban streets; night city; countryside; gardens; space; fantasy worlds.

### Vehicles
Cars; trains; motorcycles; bicycles; aircraft; spaceships; mecha vehicles; ships.

### Props
Weapons; furniture; food; school supplies; technology; musical instruments; signs; fantasy props.

### Scenes & Manga
Composition; perspective; lighting; weather; day/night; action scenes; backgrounds; panels; speech bubbles; sound effects; speed lines; screen tones; impact effects; storyboard pages.

## Animation
- Frame creation
- Frame duplication
- Frame deletion
- Frame selection
- FPS control
- Timeline foundation

## GIMP-Inspired Image Editing
- Grayscale
- Sepia
- Invert
- Brightness
- Contrast
- Saturation
- Blur
- Editable effect stack
- Effect enable/disable
- Effect removal

## Backend
- Node.js
- Express
- REST API
- MySQL
- Object-storage architecture
- Environment-based configuration

## Documentation
- Requirements
- Project design
- Data model
- UML architecture
- GIMP feature research
- Contribution guide

## Newly Added Editor Systems
- Layer dock with active-layer selection
- New, duplicate, and delete layer controls
- Rectangle and free-selection modes
- Move, rotate, scale transform modes
- Horizontal flip command
- Onion-skin workspace control
- Expanded tool picker with color-picking tool


## Full Production Feature Backlog
The following systems are tracked so the editor can grow into a complete 2D anime/cartoon production IDE. Items marked **implemented** are present in the current build; items marked **planned** require additional implementation.

### Core 2D Art
- **implemented** Pencil, ink, marker, airbrush, eraser, palette, opacity and brush size.
- **planned** True multi-layer pixel storage and compositing (current layer dock is metadata/UI foundation).
- **planned** Alpha lock, clipping layers, groups, layer masks and blend modes.
- **planned** Real rectangle/freeform selection with marching-ants bounds, cut/copy/paste and selection transforms.
- **planned** Non-destructive move/rotate/scale with transform previews.
- **planned** Real fill/bucket with contiguous and tolerance modes.
- **planned** Eyedropper sampling from composited artwork.
- **planned** Brush presets, stabilization, pressure/tilt support, symmetry/rulers and vector/path tools.
- **planned** Color management, gradients, patterns, guides, grids and snapping.

### Animation
- **implemented** Frame creation, duplication, deletion, selection and FPS control.
- **planned** True per-frame/per-layer cels.
- **planned** Playback, loop, playhead scrubbing and audio-synchronized timeline.
- **planned** Real onion skin using adjacent frame imagery.
- **planned** Keyframes, holds, exposure sheets and scene/shot timelines.
- **planned** Motion tweening, reusable symbols/parts and camera tracks.
- **planned** Lip-sync markers and phoneme timing.

### Audio Studio
- **implemented** Audio Studio workspace, audio import controls, library categories, master volume controls and procedural sound-generation entry point.
- **planned** Persistent audio assets, waveform editor, trimming/fades, gain and normalization.
- **planned** Multi-track timeline with clip placement, snapping, automation and per-track volume/pan.
- **planned** Dialogue/voice recording and cleanup.
- **planned** Music composition/sequencing and loop arrangement.
- **planned** SFX generator with richer synthesis, layered presets and parameter editing.
- **planned** Audio-to-animation synchronization and final video/audio muxing.

### Storyboard & Production
- **implemented** Storyboard panel foundation and production categories.
- **planned** Persistent storyboard panels with thumbnails, shot numbers, duration, camera notes and dialogue.
- **planned** Shot list, scene hierarchy, production status and continuity notes.
- **planned** Camera/viewport framing, pan/zoom/rotation and 2D parallax layers.
- **planned** Subtitle/caption tracks and safe-title guides.

### Content & Asset Browser
- **implemented** Content Browser categories and reusable guide-library foundation.
- **planned** Import/export asset metadata, thumbnails, tags, favorites and search.
- **planned** Character model sheets, pose libraries, expressions, clothing, props, backgrounds and FX packs.
- **planned** Reusable character rigs/cutout parts and symbol instances.
- **planned** Asset versioning and project-local packages.

### Image FX / Compositing
- **implemented** Non-destructive grayscale, sepia, invert, brightness, contrast, saturation and blur stack.
- **planned** Layer masks, adjustment layers, LUT/color grading, curves/levels, hue-shift and selective color.
- **planned** Blend modes, shadows/glows, outlines, halftone/screentone and manga FX.
- **planned** Compositing groups and render-order controls.

### Project, Files & Export
- **planned** Project save/load, autosave, recovery and project packages.
- **planned** Native project format containing scenes, shots, frames, layers, audio and asset metadata.
- **planned** PNG/JPEG/WebP sequence export, sprite sheets and transparent assets.
- **planned** Animated GIF/WebM/MP4 export with audio.
- **planned** Import of PSD/SVG/SVG-like vector assets and common image/audio formats.
- **planned** Print/manga page export and PDF production sheets.

### Collaboration & Backend
- **implemented** Node.js/Express/MySQL API foundation.
- **planned** Authentication, project permissions and cloud project storage.
- **planned** Asset/object storage integration.
- **planned** Version history, autosave sync and collaboration presence.
- **planned** Render queue and server-side export jobs.

### Cross-Platform
- **planned** Responsive desktop web app.
- **planned** PWA/offline project cache.
- **planned** Desktop packaging for Windows/macOS/Linux.
- **planned** Mobile drawing UI for iOS/Android with touch, stylus and gesture controls.
- **planned** Accessibility, keyboard shortcut customization and localization.

### Development / Build Identity
- **implemented** Project/build identity metadata and developer-credit surface are to be maintained consistently across the app and documentation.
