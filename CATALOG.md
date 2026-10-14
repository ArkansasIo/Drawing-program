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


## Anime Studio-Class Tool Suite

### Drawing & Paint
- Brush/Pencil with pressure, size, opacity and stabilization
- Ink/Pen with taper and pressure response
- Marker, airbrush and textured brushes
- Eraser with alpha erase
- Fill/bucket with contiguous and tolerance modes
- Paint-bucket gap closing and reference-layer fill
- Color picker, palette editor and color history
- Gradient, pattern and texture paint
- Line, polyline, rectangle, ellipse, polygon and curve tools
- Rulers, guides, grids and snapping
- Symmetry and mirror drawing
- Perspective guides
- Lasso, rectangle, ellipse and magic-wand selection
- Transform, warp, mesh deformation and puppet-style editing
- Crop, resize, rotate and flip
- Clone/heal-style raster retouching
- Text and typography
- Vector paths, stroke/fill editing and shape layers

### Layer & Compositing
- Raster paint layers
- Vector layers
- Group/folder layers
- Layer ordering, visibility and opacity
- Blend modes
- Alpha lock
- Clipping layers
- Layer masks
- Selection masks
- Adjustment layers
- Compositing groups
- Shadow, glow, outline and blur effects

### Anime / Cel Production
- Rough/sketch/clean-line/flat/shadow/highlight layer workflow
- Cel paint and color-key management
- Line-art-to-flat color workflow
- Reference-layer coloring
- Locked palettes and color sets
- Shadow/highlight passes
- Manga screentones
- Speed lines
- Impact frames
- Smear/FX frames
- Background and foreground separation
- Character turnarounds and model sheets
- Expression sheets
- Pose sheets

### Character Rigging
- Bone creation and hierarchy
- IK/FK controls
- Pin/target controls
- Bone constraints
- Smart bone/actions
- Deformation bones
- Mesh/point binding
- Cutout character parts
- Reusable character rigs
- Switchable hand/face/eye poses
- Reusable actions
- Rig templates

### Animation
- Frame-by-frame animation
- Timeline and exposure sheet
- Keyframes and holds
- Breakdowns and in-betweens
- Onion skin
- Playback and looping
- Keyframe interpolation
- Motion tweening
- Bone animation
- Point/mesh animation
- Camera animation
- Layer animation
- Audio-synchronized timing
- Dope sheet
- Graph/curve editor
- Animation clips/actions
- Scene and shot timelines
- Nested scenes/precomps
- Lip-sync markers and phoneme tracks

### Camera & Scene
- 2D camera framing
- Camera pan, zoom, rotate and shake
- Safe areas and title/action guides
- Multi-plane camera
- 2D parallax
- Scene composition
- Shot/scene hierarchy
- Background plates
- Foreground overlays
- Depth ordering
- Camera bookmarks

### Audio
- Audio asset library
- Dialogue/voice tracks
- Music tracks
- Sound-effect tracks
- Ambience tracks
- Multi-track timeline
- Waveform display
- Clip trim/split/duplicate
- Fade in/out
- Gain and normalization
- Pan and volume automation
- Audio markers
- Voice recording
- Basic noise cleanup
- Music loops
- Procedural SFX generation
- Lip-sync timing from dialogue

### Storyboard & Preproduction
- Storyboard panels
- Shot numbering
- Thumbnails
- Dialogue notes
- Action notes
- Camera notes
- Timing/duration
- Scene continuity
- Character/asset references
- Animatic playback
- Exportable storyboard sheets

### Asset & Content Browser
- Character library
- Pose library
- Expression library
- Clothing library
- Prop library
- Creature library
- Vehicle/mecha library
- Background library
- FX library
- Sound library
- Music library
- Voice/dialogue library
- Tags, search, favorites and metadata
- License/provenance fields
- Project-local asset packages
- Reusable templates

### Rendering & Export
- Transparent PNG
- JPEG/WebP
- Image sequences
- Sprite sheets
- Animated GIF/WebM
- MP4 production render
- Audio/video mux
- Resolution presets
- Frame-rate presets
- Alpha export
- Render regions
- Background color/plate options
- Manga/page export
- PDF production sheets

### Workflow & Productivity
- Project/scene/shot/frame organization
- Autosave and recovery
- Undo/redo history
- Keyboard shortcuts
- Custom workspaces
- Dockable panels
- Asset drag/drop
- Copy/paste between layers and frames
- Reference images
- Notes and annotations
- Search/command palette
- Preferences
- Localization
- Accessibility


## Generated Asset Source System
- **implemented** Modular anime asset generator source module.
- **implemented** Editable character-part generation model.
- **implemented** Modular clothing-set generation model with attachment points and material metadata.
- **implemented** Style palettes for modern anime, dark fantasy, classic fantasy, supernatural action, warm adventure and moonlit blue.
- **implemented** Generator workflow data for characters, faces, bodies, chibi characters, creatures, vehicles, buildings, landscapes, interiors and props.

## Hybrid 2D × 3D Stage
- **implemented** Three.js WebGL stage module.
- **implemented** 2D artwork cards represented as planes in 3D space.
- **implemented** Perspective and orthographic camera modes.
- **implemented** X/Y/Z depth staging.
- **implemented** Drag orbit and wheel camera movement.
- **implemented** Anime-oriented ambient, key and rim lighting.
- **implemented** Fog and controlled cinematic background.
- **planned** Full asset-texture import pipeline from the project asset browser.
- **planned** production-grade cel shader and outline renderer.


## Production Control Completion
- Menu routing and studio panel IDs are present for Project, How to Draw, Generator, Content Browser, Animation, Layers, Select/Transform, Storyboard, Tools, Image FX, Audio, Voice Over, Rigging, Camera, Render, Assets, 3D Stage and Settings.
- Fill and color-picker input paths are implemented.
- Audio import, generated browser audio and track controls are implemented.
- Local Studio Settings are persisted and restorable.
- Lip-sync source module: `src/lipsync.js`.
- Hybrid 3D stage drift correction is implemented in `src/stage3d.js`.


## Expanded Production Source Modules
- `src/animation.js` — timeline model, FPS, frames, holds and onion-skin state.
- `src/assets.js` — searchable asset registry, categories, tags, license/provenance and manifest export.
- `src/storyboard.js` — shot/panel creation, ordering, duration, dialogue, action, camera and notes.
- `src/rigging.js` — bones, IK controls, reusable actions and keyframes.
- `src/camera.js` — camera transforms, bookmarks and keyframes.
- `src/project.js` — scenes, shots, project serialization and local persistence.
- `src/tools.js` — centralized tool registry for drawing, paint, selection, transform, design, guides and viewport tools.
- `src/render.js` — render presets and queued render-job state.
- `src/studio-runtime.js` — central runtime wiring for the production subsystems.
