import { z } from 'zod';

export const AccountSchema = z.object({
  ownerId: z
    .number({
      invalid_type_error: 'Owner ID is required and must be a number',
    })
    .nonnegative('Owner ID must be non-negative'),
  currency: z.enum(['EUR', 'USD'], {
    errorMap: () => ({ message: 'Currency is required' }),
  }),
  balance: z
    .number({
      invalid_type_error: 'Balance is required and must be a number',
    })
    .nonnegative('Balance must be non-negative'),
});

export type AccountFormData = z.infer<typeof AccountSchema> & { id?: number };
