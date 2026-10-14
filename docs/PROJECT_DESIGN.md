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
