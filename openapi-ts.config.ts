import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts';
export default defineConfig({
  input: './api/templates/docs.json',
  output: './api',
  plugins: [
    ...defaultPlugins,
    // Use axios as http client
    '@hey-api/client-axios',

    // Generate react-query hooks
    '@tanstack/react-query',

    // Use zod as validation library
    'zod',
    {
      asClass: false,
      name: '@hey-api/sdk',
    },

    // Transform dates to correct format
    {
      name: '@hey-api/sdk',
      validator: true,
    },
    {
      dates: true,
      name: '@hey-api/transformers',
    },

    // Generate typescript enums, usage: enums
    {
      enums: 'typescript',
      name: '@hey-api/typescript',
    },

    // Generate schema, usage: validation
    {
      name: '@hey-api/schemas',
      type: 'json',
    },
  ],
});
