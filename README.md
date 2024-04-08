# Container queries for Bootstrap

## Install

```shell
npm i bootstrap-container-queries
```

### Using CSS

Add in the `<head>` of your html file:

```html
<link href="PATH_TO/bootstrap-container-queries.css" rel="stylesheet" />
```

### Importing SCSS

Add in your scss file:

```scss
@import "bootstrap-container-queries/scss/bootstrap-container-queries";
```

## Usage

Add the class `.bcq` to your parent container.

### Grid

Inside it you can use the class `.bcq-{size}` or `.bcq-{breakpoint}-{size}` like you will use a `.col-*`in Bootstrap.

### Display

You can hide or display items ([with any other display values](https://getbootstrap.com/docs/5.3/utilities/display/#notation)) with `.bcq-d-{value}` or `.bcq-d-{breakpoint}-{value}` like `.d-*`.

### Text align

You can align text at `start`, `center` or `end` with `.bcq-text-{value}` or `.bcq-text-{breakpoint}-{value}` like `.text-*`.

### Float

You can make the element float at `start`, `end` or `none` with `.bcq-float-{value}` or `.bcq-float-{breakpoint}-{value}` like `.float-*`.

### Margin and padding

You can add the bootstrap margin or padding with `.bcq-m{sides}-{breakpoint}-{value}` or `.bcq-p{sides}-{breakpoint}-{value}`.

## Custom breakpoints

You can add custom breakpoints for container queries:

```scss
$container-queries-breakpoints: (
  sm: 30em,
  md: 48em,
  lg: 62em,
  xl: 75em,
  xxl: 90em
);
```