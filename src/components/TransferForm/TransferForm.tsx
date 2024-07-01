import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { transferFunds } from '../../services/api';
import { TransferSchema, TransferFormData } from './transferSchema';

const TransferForm = () => {
  const [statusMessage, setStatusMessage] = useState({
    message: '',
    isError: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(TransferSchema),
  });

  const onSubmit: SubmitHandler<TransferFormData> = async (data) => {
    try {
      await transferFunds(data.fromOwnerId, data.toOwnerId, data.amount);
      setStatusMessage({
        message: 'Transfer successful!',
        isError: false,
      });
    } catch (error: any) {
      console.error('Error transferring funds:', error);
      setStatusMessage({
        message: 'Transfer failed. Please try again.',
        isError: true,
      });
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <TextField
        label='From Owner ID'
        {...register('fromOwnerId', { valueAsNumber: true })}
        error={!!errors.fromOwnerId}
        helperText={errors.fromOwnerId?.message}
        fullWidth
        margin='normal'
      />
      <TextField
        label='To Owner ID'
        {...register('toOwnerId', { valueAsNumber: true })}
        error={!!errors.toOwnerId}
        helperText={errors.toOwnerId?.message}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Amount'
        {...register('amount', { valueAsNumber: true })}
        error={!!errors.amount}
        helperText={errors.amount?.message}
        fullWidth
        margin='normal'
      />
      <Box sx={{ mt: 2 }}>
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Transfer
        </Button>
      </Box>
      {statusMessage.message && (
        <Typography
          variant='body1'
          align='center'
          color={statusMessage.isError ? 'error' : 'green'}
          sx={{ mt: 1 }}
        >
          {statusMessage.message}
        </Typography>
      )}
    </Box>
  );
};

export default TransferForm;
