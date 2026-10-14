# GIMP Feature Research and Anime Studio Adaptation

Research sources:
- [GIMP 3.0 release notes](https://www.gimp.org/release-notes/gimp-3.0.html)
- [GIMP 3.2 release notes](https://www.gimp.org/release-notes/gimp-3.2.html)
- [GIMP user manual: capabilities](https://docs.gimp.org/3.0/en/introduction.html)
- [GIMP filter manual](https://docs.gimp.org/3.0/en/filters.html)
- [GIMP plug-in developer overview](https://developer.gimp.org/resource/about-plugins/)

## Key ideas to adapt
1. **Dockable editor panels:** tools, layers, brushes, colors, assets, and details remain accessible around the viewport.
2. **Non-destructive effects:** retain an editable stack of effects so artists can change or remove an effect later. GIMP 3 introduced non-destructive filters and stores supported filter settings in XCF projects.
3. **Layer organization:** named layers, visibility, opacity, ordering, and layer groups are essential for separating sketch, clean line, flats, shadows, highlights, effects, and backgrounds.
4. **Selections and masks:** rectangular, elliptical, freehand/lasso, color-based selections, alpha selection, and masks help protect line art and color regions.
5. **Paint tools:** configurable brushes, pencil, airbrush, eraser, clone/heal, smudge, dodge/burn, gradient, and color picker.
6. **Transform tools:** move, crop, rotate, scale, flip, shear, perspective, and alignment.
7. **Color workflow:** palettes, gradients, color picker, color profiles, transparency, and soft-proofing where supported.
8. **Filter/effect families:** blur, enhance, distort, light/shadow, noise, edge detection, artistic, decor, map, render, and animation effects.
9. **Text tools:** editable dialogue, labels, manga sound effects, outlines, and shadows.
10. **Extensibility:** a plugin interface for new brushes, filters, import/export formats, and generators.

## Anime-specific presets
- Cel-shading bands and highlight controls
- Manga screentones, halftone, speed lines, impact bursts
- Line-art cleanup and edge emphasis
- Palette sets for skin, hair, eyes, fabric, night scenes, and dramatic lighting
- Layer templates: construction, sketch, clean line, flats, shadows, highlights, effects, background
- Export presets for transparent sprites, character sheets, manga pages, storyboard frames, and animation sequences

## Current implementation boundary
The existing application is a browser-based canvas and is not a full GIMP replacement. The first integration adds an editable effect-stack UI and common real-time canvas effects. Full raster layers, masks, selection geometry, clone/heal, color-managed pipelines, plugin sandboxing, and advanced GEGL-like processing remain separate engineering milestones and must not be described as implemented until built and tested.
