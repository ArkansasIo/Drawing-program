# Anime Studio — Data Model

Core tables:
- users
- projects
- scenes
- shots
- frames
- layers
- assets
- asset_metadata
- content_categories
- guides
- guide_steps
- storyboard_panels

Recommended relationships:
- one user → many projects
- one project → many scenes
- one scene → many shots
- one shot → many frames
- one frame → many layers
- one project → many assets
- one category → many guides
- one guide → many ordered guide steps
- one shot → many storyboard panels

JSON fields are appropriate for extensible drawing/character design parameters, but relational columns should remain available for frequently queried fields such as project ID, category, style, timestamps, ownership, and ordering.
