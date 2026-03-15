import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_GRAPHQL_API_URL: z
      .string()
      .default('http://localhost:4000/graphql'),
  },

  runtimeEnv: {
    NEXT_PUBLIC_GRAPHQL_API_URL: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  },
});
