# Contributing

## Setup

```sh
npm ci
npm start   # serves ./docs and watches the SCSS
```

## Checks

```sh
npm run lint          # prettier + stylelint
npm run build         # regenerates dist/ (commit the result)
npm run test:unit     # Sass compilation tests
npm run test:visual   # visual regression tests (Linux references)
```

Visual references are generated on Linux. Update them with Docker so they match CI:

```sh
npm run test:visual:docker
VRT_ARGS="-u" npm run test:visual:docker
```

CI fails if `dist/` is not up to date with `scss/`, so always run `npm run build` before committing.

## Pull requests

- Keep changes focused and update `CHANGELOG.md` and the README when behavior changes.
- Make sure `npm run lint` and the tests pass.

## Releasing (maintainers)

1. Update `version` in `package.json` and `CHANGELOG.md`, run `npm run build`, and commit.
2. Tag the commit `vX.Y.Z` (for example `v4.0.0-alpha.3`) and push the tag.
3. The `Release` workflow checks the tag matches `package.json`, runs lint/build/tests, and **stages** the release on npm (`npm stage publish`). Approve it with 2FA via `npm stage list` / `npm stage approve <stage-id>` or the _Staged Packages_ tab on npmjs.com. Versions containing a `-` (alpha, beta, rc) use the `next` dist-tag.

Publishing uses npm [Trusted Publishing](https://docs.npmjs.com/trusted-publishers): configure this repository and the `release.yml` workflow as a trusted publisher in the package settings on npmjs.com, leaving both "Allow npm publish" and "Allow npm dist-tag" unchecked so the workflow can only stage.
