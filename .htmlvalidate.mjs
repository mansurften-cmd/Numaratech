// html-validate config — run with `npm run check:html` against dist/.
export default {
  extends: ['html-validate:recommended'],
  rules: {
    // Style and formatting preferences, not correctness. Astro's compressed
    // output and the project's inline layout styles would otherwise flood
    // the report.
    'no-inline-style': 'off',
    'attribute-boolean-style': 'off',
    'attribute-empty-style': 'off',
    'no-trailing-whitespace': 'off',
    'void-style': 'off',
    'long-title': 'off',
    // WCAG H32 (a form needs a submit button) is about forms that submit.
    // The two calculator forms recompute as you type and submit nothing;
    // with several text fields and no submit button, Enter does nothing, so
    // there is no hidden reload to guard against. Accepted deliberately.
    'wcag/h32': 'off',
  },
};
