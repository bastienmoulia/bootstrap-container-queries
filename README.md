# Container queries for Bootstrap

> [!NOTE]
> Version 4 targets **Bootstrap 6** (currently in alpha). For Bootstrap 5, use the 3.x line:
> `npm i bootstrap-container-queries@3` — see the [v3 demo](https://bastienmoulia.github.io/bootstrap-container-queries/v3/) and `dist/v3/`.

[Demo](https://bastienmoulia.github.io/bootstrap-container-queries/)

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

Add the class `.bcq` to your parent container. It is a lightweight alias of Bootstrap's `.contains-inline`, which can be used as well.

Classes use the container prefix `@{breakpoint}:`, for example `@md:d-none`. Breakpoints are `sm`, `md`, `lg`, `xl` and `2xl`. The base (`xs`) classes are the regular Bootstrap ones.

### Grid

Inside a `.row` you can use `.@{breakpoint}:col-{size}` like you will use a `.col-*` in Bootstrap.

### Display

You can hide or display items ([with any other display values](https://getbootstrap.com/docs/6.0/utilities/display/)) with `.@{breakpoint}:d-{value}` like `.d-*`.

### Text align

You can align text at `start`, `center` or `end` with `.@{breakpoint}:text-{value}` like `.text-*`.

### Float

You can make the element float at `start` or `end` with `.@{breakpoint}:float-{value}` like `.float-*`.

### Margin and padding

You can add the bootstrap margin or padding with `.@{breakpoint}:m{sides}-{value}` or `.@{breakpoint}:p{sides}-{value}`.

### Flex direction

You can add the flex direction `column`, `column-reverse`, `row` or `row-reverse` with `.@{breakpoint}:flex-{value}`.

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

| 3.x (Bootstrap 5)               | 4.x (Bootstrap 6)          |
| ------------------------------- | -------------------------- |
| `.bcq-md-4`                     | `.@md:col-4`               |
| `.bcq-d-md-none`                | `.@md:d-none`              |
| `.bcq-text-md-end`              | `.@md:text-end`            |
| `.bcq-float-md-start`           | `.@md:float-start`         |
| `.bcq-flex-md-column`           | `.@md:flex-column`         |
| `.bcq-mt-md-3`, `.bcq-px-md-3`  | `.@md:mt-3`, `.@md:px-3`   |
| `.bcq-xxl-*`                    | `.@2xl:*`                  |
| `.bcq-d-none`, `.bcq-text-end`… | `.d-none`, `.text-end`…    |
| breakpoints `30em`, `48em`…     | Bootstrap 6 px breakpoints |
| `bootstrap-sass-modules`        | `bootstrap` 6              |

Bootstrap 6 renamed its spacers (`.mt-3` is now `0.5rem`) and logical properties, see the [Bootstrap 6 migration guide](https://blog.getbootstrap.com/2026/10/08/bootstrap-6-alpha/).

## Development

```shell
npm run build        # build dist/
npm test             # unit and visual tests
npm run test:visual:docker   # visual tests in the Playwright Linux image
```

The visual tests compare screenshots with the baselines in `tests/visual/__screenshots__`. Screenshots depend on the platform, so the committed reference ones are the Linux ones, generated with `VRT_ARGS=-u npm run test:visual:docker`.

## Warning

The `.bcq` class will create a new [Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context) that can result of z-index or transform: translate on the Z axis to not work.

# Contributors

<p align="center">
  <img src="https://contributors-img.web.app/image?repo=bastienmoulia/bootstrap-container-queries"/>
</p>
