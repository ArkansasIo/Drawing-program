# Contributing to Anime Studio

Thank you for contributing.

## Development

1. Fork or clone the repository.
2. Create a focused branch for your change.
3. Install dependencies with npm install.
4. Run the application locally.
5. Test the browser UI and API behavior relevant to your change.
6. Keep database credentials and secrets out of source control.
7. Update documentation when behavior or architecture changes.
8. Open a pull request with a clear description.

## Code Guidelines

- Prefer small, focused changes.
- Preserve the existing vanilla HTML/CSS/JavaScript foundation unless a migration is justified.
- Keep browser code independent from database credentials.
- Validate user-controlled API input.
- Preserve accessibility and keyboard usability.
- Keep animation frame ordering deterministic.
- Include asset provenance and licensing metadata where applicable.

## Assets and Copyright

Only contribute assets you have the right to distribute. Prefer original, licensed, public-domain, or user-created material. Do not add third-party copyrighted artwork without appropriate permission.

## Pull Requests

A good pull request should state:
- What changed
- Why it changed
- How it was tested
- Any database/schema changes
- Any new assets or licensing information
- Known limitations

## Issues

For bugs, include reproduction steps, browser/OS information, expected behavior, actual behavior, and relevant console/API errors.
