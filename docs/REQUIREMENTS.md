# Anime Studio — Software Requirements Specification

## Vision
Anime Studio is a browser-based 2D drawing, animation, storyboard, and visual-development environment inspired by professional game-engine editors. It is designed around an anime/cartoon production workflow.

## Functional Requirements
- FR-01: Create and manage projects.
- FR-02: Create scenes and shots.
- FR-03: Draw with pencil, ink, marker, airbrush, eraser, and fill tools.
- FR-04: Support touch, mouse, and stylus input.
- FR-05: Maintain undo/redo history.
- FR-06: Support animation frames and frame timing.
- FR-07: Provide storyboard panels, dialogue, camera notes, and action notes.
- FR-08: Provide step-by-step drawing guides.
- FR-09: Organize reusable assets by category, tags, style, and license metadata.
- FR-10: Support characters, clothing, anatomy, creatures, buildings, environments, vehicles, props, and effects.
- FR-11: Save and load projects through the REST API.
- FR-12: Persist users, projects, guides, assets, and metadata in MySQL.
- FR-13: Export drawings and production outputs.
- FR-14: Keep server credentials out of the browser.
- FR-15: Deploy the static frontend to GitHub Pages and host the API/database separately.

## Non-Functional Requirements
- NFR-01: Responsive UI for desktop and tablet/mobile layouts.
- NFR-02: Componentized JavaScript suitable for future TypeScript migration.
- NFR-03: API uses HTTPS in production.
- NFR-04: Database credentials remain server-side.
- NFR-05: Asset metadata records provenance/licensing information.
- NFR-06: UI remains usable at high asset-library counts through search, filtering, and pagination.
- NFR-07: Production exports must preserve project/frame ordering.

## Production Modules
Viewport, Brush Engine, Layers, Timeline, Content Browser, Details/Inspector, Guide System, Generator, Storyboard, Project Manager, Export Pipeline, REST API, Authentication, MySQL persistence, Asset Storage.

## Future Extensions
Onion skinning, keyframes, tweening, camera tracks, audio tracks, vector layers, raster layers, skeletal animation, scene graph, collaboration, plugins, scripting, and render queue.
