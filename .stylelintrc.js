module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
    'declaration-block-no-duplicate-properties': true,
    'selector-class-pattern': [
      '^([a-z]+[a-z0-9]*)([-_]{1,2}[a-z]+[a-z0-9]*[-_]*[a-z0-9]*)*$',
      {
        message:
          'Class selectors should follow BEM (Block, Element, Modifier) naming convention with hyphens, underscores, or double underscores.',
      },
    ],
  },
};
