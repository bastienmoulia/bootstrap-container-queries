# Container queries for Bootstrap

> [!NOTE]
> Version 4 targets **Bootstrap 6** (currently in alpha). For Bootstrap 5, use the 3.x line:
> `npm i bootstrap-container-queries@3` — see the [v3 demo](https://bastienmoulia.github.io/bootstrap-container-queries/v3/) and `dist/v3/`.

[Demo](https://bastienmoulia.github.io/bootstrap-container-queries/)

## What is it?

Bootstrap's responsive classes react to the _viewport_. This library adds classes that react to the width of a _parent container_ instead, using CSS [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries). A component behaves the same in a sidebar as on a full-width page.

```html
<div class="contains-inline">
  <div class="d-none cq-md:d-block">
    Shown when the container is at least md wide
  </div>
</div>
```

The container needs a width of its own: it cannot size itself from its content.

## Install

```shell
npm i bootstrap@next bootstrap-container-queries@next
```

Browser support follows Bootstrap 6 (Chrome and Edge 130+, Firefox 132+, Safari 18+). Building the Sass requires Dart Sass 1.103 or later.

### Using CSS

Add in the `<head>` of your html file, after Bootstrap:

```html
<link href="PATH_TO/bootstrap-container-queries.css" rel="stylesheet" />
```

The CSS uses Bootstrap's cascade layers (`layout` and `utilities`), so Bootstrap must be loaded first.

### Importing SCSS

Add in your scss file:

```scss
@use "bootstrap-container-queries/scss/bootstrap-container-queries";
```

`@import` is not supported by Bootstrap 6.

## Usage

Make the parent a query container with Bootstrap's `.contains-inline` class (or `@include set-container()` in Sass, or any other Bootstrap container such as `.grid`).

Classes use the container prefix `cq-{breakpoint}:`, for example `cq-md:d-none`. Breakpoints are `sm`, `md`, `lg`, `xl` and `2xl`. The base (`xs`) classes are the regular Bootstrap ones.

### Grid

Inside a `.row` you can use `.cq-{breakpoint}:col-{size}` like you will use a `.col-*` in Bootstrap.

### Display

You can hide or display items ([with any other display values](https://getbootstrap.com/docs/6.0/utilities/display/)) with `.cq-{breakpoint}:d-{value}` like `.d-*`.

### Text align

You can align text at `start`, `center` or `end` with `.cq-{breakpoint}:text-{value}` like `.text-*`.

### Float

You can make the element float at `start` or `end` with `.cq-{breakpoint}:float-{value}` like `.float-*`.

### Margin and padding

You can add the bootstrap margin or padding with `.cq-{breakpoint}:m{sides}-{value}` or `.cq-{breakpoint}:p{sides}-{value}`.

### Flex direction

You can add the flex direction `column`, `column-reverse`, `row` or `row-reverse` with `.cq-{breakpoint}:flex-{value}`.

### Reference

Default breakpoints (Bootstrap's `$breakpoints`): `sm` 576px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.

| Feature        | Classes                                          | Example                      |
| -------------- | ------------------------------------------------ | ---------------------------- |
| Grid           | `.cq-{bp}:col-{1-12}`                            | `.cq-md:col-4`               |
| Display        | `.cq-{bp}:d-{value}`                             | `.cq-lg:d-none`              |
| Flex direction | `.cq-{bp}:flex-{value}`                          | `.cq-lg:flex-column-reverse` |
| Text align     | `.cq-{bp}:text-{start\|center\|end}`             | `.cq-md:text-end`            |
| Float          | `.cq-{bp}:float-{start\|end}`                    | `.cq-sm:float-end`           |
| Margin/padding | `.cq-{bp}:m{sides}-{n}`, `.cq-{bp}:p{sides}-{n}` | `.cq-xl:mt-5`, `.cq-md:px-3` |

Utilities are generated from Bootstrap's own `$utilities`, so values and the spacing scale match Bootstrap 6. Class names contain `@` and `:`, so escape them in CSS selectors (`.cq-md\:d-none`).

## Custom breakpoints and utilities

By default the container breakpoints are the Bootstrap `$breakpoints`. You can use others:

```scss
@use "bootstrap-container-queries/scss/bootstrap-container-queries" with (
  $container-queries-breakpoints: (
    xs: 0,
    sm: 30em,
    md: 48em,
    lg: 62em,
  )
);
```

### Named container

By default the classes react to the nearest query container. To target a specific one, name it and pass the name:

```scss
@use "bootstrap/scss/layout/breakpoints" as bp;
@use "bootstrap-container-queries/scss/bootstrap-container-queries" with (
  $container-queries-container-name: sidebar
);

.sidebar {
  @include bp.set-container(inline-size, sidebar);
}
```

The queries then use `@container sidebar (width >= …)`.

The generated utilities are the Bootstrap utilities listed in `$container-queries-utilities` (display, flex-direction, text-align, float, margin and padding by default):

```scss
@use "bootstrap-container-queries/scss/bootstrap-container-queries" with (
  $container-queries-utilities: (
    "display",
    "gap",
  )
);
```

## Migrating from 3.x

| 3.x (Bootstrap 5)               | 4.x (Bootstrap 6)            |
| ------------------------------- | ---------------------------- |
| `.bcq` (container)              | `.contains-inline`           |
| `.bcq-md-4`                     | `.cq-md:col-4`               |
| `.bcq-d-md-none`                | `.cq-md:d-none`              |
| `.bcq-text-md-end`              | `.cq-md:text-end`            |
| `.bcq-float-md-start`           | `.cq-md:float-start`         |
| `.bcq-flex-md-column`           | `.cq-md:flex-column`         |
| `.bcq-mt-md-3`, `.bcq-px-md-3`  | `.cq-md:mt-3`, `.cq-md:px-3` |
| `.bcq-xxl-*`                    | `.cq-2xl:*`                  |
| `.bcq-d-none`, `.bcq-text-end`… | `.d-none`, `.text-end`…      |
| breakpoints `30em`, `48em`…     | Bootstrap 6 px breakpoints   |
| `bootstrap-sass-modules`        | `bootstrap` 6                |

Bootstrap 6 renamed its spacers (`.mt-3` is now `0.5rem`) and logical properties, see the [Bootstrap 6 migration guide](https://blog.getbootstrap.com/2026/10/08/bootstrap-6-alpha/).

## Version 3 (Bootstrap 5)

The 3.x line stays available for Bootstrap 5:

```shell
npm i bootstrap-container-queries@3
```

Classes are prefixed with `bcq-` (`.bcq-md-4`, `.bcq-d-md-none`, `.bcq-text-md-end`, `.bcq-float-md-start`, `.bcq-flex-md-column`, `.bcq-mt-md-3`), base classes exist too (`.bcq-d-none`), and the default breakpoints are `sm` 30em, `md` 48em, `lg` 62em, `xl` 75em, `xxl` 90em, customizable with `$container-queries-breakpoints`.

The v3 build is also shipped in this package as `bootstrap-container-queries/dist/v3/bootstrap-container-queries.css`. See the [v3 documentation and demo](https://bastienmoulia.github.io/bootstrap-container-queries/v3/).

## Development

```shell
npm run build        # build dist/
npm test             # unit and visual tests
npm run test:visual:docker   # visual tests in the Playwright Linux image
```

The visual tests compare screenshots with the baselines in `tests/visual/__screenshots__`. Screenshots depend on the platform, so the committed reference ones are the Linux ones, generated with `VRT_ARGS=-u npm run test:visual:docker`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution and release process, and [SECURITY.md](SECURITY.md) to report vulnerabilities.

## Warning

The `.contains-inline` class will create a new [Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context) that can result of z-index or transform: translate on the Z axis to not work.

# Contributors

<p align="center">
  <img src="https://contributors-img.web.app/image?repo=bastienmoulia/bootstrap-container-queries"/>
</p>
