<!-- https://keepachangelog.com/en/1.1.0/ -->

# Changelog

## [3.0.1] - 2024-05-17

### Fixed

- Set `bootstrap-sass-modules` as a dependency.

## [3.0.0] - 2024-05-03

### Added

- The library can be used with SASS modules.

### Changed

- Some internal SCSS files have been renamed with `bcq-` prefix.
- Use `bootstrap-sass-modules` instead of `bootstrap`.

## [2.0.0] - 2024-04-08

### Added

- Add custom breakpoints for container queries:

```scss
$container-queries-breakpoints: (
  sm: 30em,
  md: 48em,
  lg: 62em,
  xl: 75em,
  xxl: 90em,
) !default;
```

- Add buttons to change the size of the container in the demo page.

## [1.4.0] - 2024-03-25

### Added

- Add classes for margin and padding.

## [1.3.0] - 2024-03-24

### Changed

- Change the CSS for `.bcq` to be minimal.

## [1.2.0] - 2024-03-22

### Added

- Add classes for `.bcq-text-{breakpoint}-{value}` and `.bcq-float-{breakpoint}-{value}`.

## [1.1.0] - 2024-03-22

### Added

- Normal and compressed versions of the CSS file in dist.

### Fixed

- Fixed import of the library by adding export in the package.json
- Move the bootstrap import from the main scss file into another for the build

## [1.0.0] - 2024-03-21

### Added

- Container queries with `.bcq`, `.bcq-{breakpoint}-{size}` and `.bcq-d-{breakpoint}-{value}`.
