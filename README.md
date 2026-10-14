# Anime Studio

**Anime Studio** is a browser-based 2D drawing, animation, storyboard, and visual-development environment inspired by professional game-engine editors and raster-art workflows.

It combines an Unreal-style production workspace with anime/cartoon drawing guides, animation frames, manga tools, reusable assets, and a full-stack Node.js + MySQL architecture.

> **Status:** Active prototype / foundation. Some advanced editor systems are planned and are explicitly marked as such.

## Features

### Art & Drawing
- Pencil, ink, marker, airbrush, eraser, and fill tools
- Brush size, opacity, color picker, palettes
- Touch, mouse, and stylus input
- Undo/redo and PNG export
- Anime construction guides for faces, eyes, hair, anatomy, hands, feet, and clothing

### Professional Editor Layout
- Central **Viewport**
- Left **Tool Dock**
- **Content Browser**
- Context-sensitive **Details / Generator** panels
- **Animation Timeline**
- **Storyboard** workspace
- Project → Scene → Shot → Frame → Layer production model

### Animation & Storyboarding
- Add, duplicate, delete, and select frames
- FPS control
- Scene and shot creation
- Manga panels
- Speech bubbles
- Speed-line/action effects
- Foundation for character sheets, animated shorts, episodes, and movies

### Content Library
Organized reference and design categories include:
- Characters and anatomy
- Hairstyles and expressions
- Clothing and fabric
- Creatures and monsters
- Buildings and architecture
- Environments
- Vehicles and mecha
- Props and technology
- Scene composition and perspective
- Manga effects and storyboard elements

The library is designed for original, licensed, public-domain, and user-created resources with provenance and license metadata.

### Generated Anime Assets

The source generator modules now model editable character and clothing components instead of only flattened images. Character parts include head, eyes, hair, expression, body, hands, clothing, accessories, shadows and highlights. Clothing assets carry material, color, attachment-point and layer metadata.

### Hybrid 2D × 3D Anime Stage

Anime Studio keeps 2D artwork as the source asset while staging it in a real Three.js WebGL scene. The stage supports perspective/orthographic projection, depth cards, camera orbit/zoom, atmospheric fog, ambient/key/rim lighting and dark saturated anime-oriented presentation. Full cel shaders, texture asset import and production rendering remain roadmap items.

### GIMP-Inspired Editing
The editor includes an initial non-destructive **Image FX** stack:
- Grayscale
- Sepia
- Invert
- Brightness
- Contrast
- Saturation
- Blur
- Enable/disable effects
- Remove effects
- Apply active effects during PNG export

Advanced raster features such as true layers, masks, selections, clone/heal, advanced color management, and a plugin API remain roadmap items.

## How to Use

1. Open the application.
2. Create a project and select its production type.
3. Use **How to Draw** for construction lessons.
4. Use **Content Browser** to find guides and reusable assets.
5. Draw in the central viewport.
6. Use **Image FX** for non-destructive visual adjustments.
7. Open **Animation** to create and manage frames.
8. Use **Storyboard** to organize shots and dialogue.
9. Export the finished artwork.

## Character Workflow

**Gesture → Construction → Anatomy → Hair/Clothing → Line Art → Flats → Shadows → Highlights → FX → Export**

## Production Workflow

**Project → Scene → Shot → Character/Asset → Frame → Layer → Timeline → Storyboard → Export**

## Full-Stack Architecture

~~~text
GitHub Pages / Static Frontend
          │
          ▼
     HTTPS REST API
          │
          ▼
   Node.js / Express
      │          │
      ▼          ▼
    MySQL    Object Storage
~~~

MySQL credentials and server secrets never belong in the browser.

### Requirements

- Node.js 18+
- MySQL 8+
- Git

### Local Setup

~~~bash
git clone https://github.com/ArkansasIo/Drawing-program.git
cd Drawing-program
npm install
cp .env.example .env
~~~

Configure the database values in .env, initialize database/schema.sql, then run:

~~~bash
npm start
~~~

The API defaults to port 3000.

## GitHub Pages

The frontend is deployable through .github/workflows/pages.yml.

GitHub Pages hosts the static editor. The dynamic API and MySQL database must be hosted separately over HTTPS.

## Documentation

- [Requirements](docs/REQUIREMENTS.md)
- [Project Design](docs/PROJECT_DESIGN.md)
- [Data Model](docs/DATA_MODEL.md)
- [UML Architecture](docs/ARCHITECTURE.md)
- [GIMP Feature Research](docs/GIMP_FEATURE_RESEARCH.md)
- [Contribution Guide](CONTRIBUTING.md)
- [Catalog](CATALOG.md)

## Roadmap

### Editor
- [x] Core drawing canvas
- [x] True raster layer canvases and compositing
- [x] Layer visibility and opacity
- [x] Pixel-preserving layer duplication
- [x] Alpha eraser and safe horizontal flip
- [x] Professional dock-style workspace
- [x] Animation frame timeline
- [x] Basic image FX stack
- [ ] True multi-layer raster engine
- [ ] Layer groups and masks
- [ ] Selection and transform system
- [ ] Onion skinning
- [ ] Keyframes and animation tracks
- [ ] Audio timeline
- [ ] Audio library, procedural SFX, recording, waveform editing and music sequencing

### Anime Production
- [x] Construction guides
- [x] Character/background reference library
- [x] Manga/storyboard tools
- [x] Character asset-part generator foundation
- [x] Live 2D × 3D WebGL stage foundation
- [ ] Character rigging
- [ ] Cel-shading system
- [ ] Manga screentone engine
- [ ] Advanced camera system
- [ ] Render queue

### Platform
- [x] Static frontend
- [x] Node/Express API foundation
- [x] MySQL schema foundation
- [ ] Authentication
- [ ] Project cloud storage
- [ ] Asset upload/storage service
- [ ] Production API deployment

## Development Build Identity

- **Project:** Anime Studio
- **Build name:** Anime Studio — 2D Production IDE
- **Build ID:** AS-2D-2026.10.14
- **Version:** 0.3.0-dev
- **Developer:** ArkansasIo
- **Build focus:** unified 2D drawing, animation, storyboard, audio and production workflow

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE).

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## Repository

[ArkansasIo/Drawing-program](https://github.com/ArkansasIo/Drawing-program)


## UI and Studio Controls
- Dedicated Voice Over workspace with system voice preview, microphone takes, dialogue tracks and anime lip-sync markers.
- Fill and eyedropper tools are wired to the active raster layer.
- Audio import, soundtrack track creation and procedural browser sound generation are wired.
- Studio Settings persist theme, autosave preference, grid, symmetry and default FPS in local storage.
- Anime Studio identity is exposed as `anime-studio` for integration and diagnostics.
- GitHub Pages validation includes all current `src/` production modules.


### Production Runtime Architecture
The studio now has a modular runtime under `src/`: animation timeline, asset/provenance registry, storyboard, rigging, camera tracks, project persistence, tool registry, render queue, generator, lip-sync, 3D stage, and a central `studio-runtime.js` integration layer. The browser UI remains lightweight while production state is represented as serializable JavaScript objects suitable for future backend/cloud persistence.


### Core Runtime Additions
Selection geometry, keyframe interpolation/easing, multitrack audio state, project import/validation, serializable 2.5D stage state, command history, and JSON project export/import helpers are now implemented as dedicated source modules under `src/`.


## Source modules added in the production runtime

- `src/studio-runtime.js` — central project/runtime wiring, import/export, camera, stage and UI bindings.
- `src/animation.js`, `src/keyframes.js`, `src/camera.js` — timeline playback, keyframe interpolation and camera tracks.
- `src/cel.js`, `src/brushes.js`, `src/selection.js` — cel/layer compositing primitives, brush presets and selection geometry.
- `src/rig-solver.js`, `src/rigging.js` — bone hierarchy evaluation and two-bone IK math.
- `src/audio.js`, `src/waveform.js`, `src/lipsync.js` — audio project structure, Web Audio decoding/peaks, and text-estimated viseme markers.
- `src/assets.js`, `src/importer.js`, `src/serialization.js`, `src/validation.js`, `src/undo.js` — asset metadata, project parsing, JSON export, state validation and command history.
- `src/export.js`, `src/render.js`, `src/stage-state.js`, `src/stage3d.js` — canvas export helpers, render jobs, 2.5D stage state and Three.js stage.

### Implementation status

This is an actively developed browser-based studio. Project JSON restore/export, basic timeline playback, image asset registration, camera controls, 2.5D stage controls, and the source-module foundation are implemented. Full per-layer cel exposure, frame-specific drawing snapshots, polygon selection interaction, actual selection transforms, waveform editing, phoneme-accurate audio lip-sync, packaged video rendering, and cloud collaboration remain in progress; the UI should not be interpreted as proof that those advanced workflows are complete.
