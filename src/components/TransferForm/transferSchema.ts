import { z } from 'zod';

export const TransferSchema = z.object({
  fromOwnerId: z
    .number({
      invalid_type_error: 'From Owner ID is required and must be a number',
    })
    .nonnegative('From Owner ID must be non-negative'),
  toOwnerId: z
    .number({
      invalid_type_error: 'To Owner ID is required and must be a number',
    })
    .nonnegative('To Owner ID must be non-negative'),
  amount: z
    .number({
      invalid_type_error: 'Amount is required and must be a number',
    })
    .positive('Amount must be positive'),
});

export type TransferFormData = z.infer<typeof TransferSchema>;
