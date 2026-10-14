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
- [x] Professional dock-style workspace
- [x] Animation frame timeline
- [x] Basic image FX stack
- [ ] True multi-layer raster engine
- [ ] Layer groups and masks
- [ ] Selection and transform system
- [ ] Onion skinning
- [ ] Keyframes and animation tracks
- [ ] Audio timeline

### Anime Production
- [x] Construction guides
- [x] Character/background reference library
- [x] Manga/storyboard tools
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

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE).

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## Repository

[ArkansasIo/Drawing-program](https://github.com/ArkansasIo/Drawing-program)
