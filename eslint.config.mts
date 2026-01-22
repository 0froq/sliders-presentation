import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    typescript: {
      // tsconfigPath: 'tsconfig.json',
    },
    vue: true,
    rules: {
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 1 },
        multiline: { max: 1 },
      }],
      'unused-imports/no-unused-imports': 'off',
    },
    formatters: {
      css: true,
      html: true,
    },
  },
)
