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
@import "~bootstrap-container-queries/scss/bootstrap-container-queries";
```

## Usage

Add the class `.bcq` to your parent container.

Inside it you can use the class `.bcq-{size}` or `.bcq-{breakpoint}-{size}` like you will use a `.col-*`in Bootstrap.

You can also hide or display items with `.bcq-d-{value}` or `.bcq-d-{breakpoint}-{value}` like `.d-*`.
