import ts from 'typescript-eslint'
import tailwind from 'eslint-plugin-tailwindcss'

export default [
  {
    ignores: [
      '**/.*',
      '**/env.ts',
      '**/trpc/react.tsx',
      '**/stepper/step.tsx',
      '**/tailwind/web.ts'
    ]
  },
  ...ts.configs.stylistic,
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn'],
        config: './tooling/tailwind/web.ts',
        whitelist: ['toaster']
      }
    }
  }
]
