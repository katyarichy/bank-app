import { useState } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { createAccount, isOwnerIdDuplicate } from '../../services/api';
import { AccountSchema, AccountFormData } from './accountSchema';

interface AccountFormProps {
  onSave?: (account: AccountFormData & { id: number }) => void;
}

const AccountForm = ({ onSave }: AccountFormProps) => {
  const [statusMessage, setStatusMessage] = useState({
    message: '',
    isError: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<AccountFormData>({
    resolver: zodResolver(AccountSchema),
  });

  const currency = useWatch({ control, name: 'currency' });

  const onSubmit: SubmitHandler<AccountFormData> = async (
    data: AccountFormData
  ) => {
    try {
      const isDuplicate = await isOwnerIdDuplicate(data.ownerId);
      if (isDuplicate) {
        setStatusMessage({ message: 'Owner ID already exists', isError: true });
        return;
      }

      const createdAccount = await createAccount(data);
      if (onSave) onSave(createdAccount);
      setStatusMessage({
        message: 'Account created successfully!',
        isError: false,
      });
      reset();
    } catch (error) {
      console.error('Error saving account:', error);
      setStatusMessage({
        message: 'Failed to save account. Please try again.',
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
        label='Owner ID'
        {...register('ownerId', { valueAsNumber: true })}
        error={!!errors.ownerId || statusMessage.isError}
        helperText={
          errors.ownerId ? errors.ownerId.message : statusMessage.message
        }
        fullWidth
        margin='normal'
      />
      <FormControl fullWidth margin='normal'>
        <InputLabel>Currency</InputLabel>
        <Select
          label='Currency'
          {...register('currency')}
          error={!!errors.currency}
          value={currency || ''}
        >
          <MenuItem value='EUR'>EUR</MenuItem>
          <MenuItem value='USD'>USD</MenuItem>
        </Select>
        {errors.currency && (
          <Typography color='error'>{errors.currency.message}</Typography>
        )}
      </FormControl>
      <TextField
        label='Balance'
        {...register('balance', { valueAsNumber: true })}
        error={!!errors.balance}
        helperText={errors.balance ? errors.balance.message : ''}
        fullWidth
        margin='normal'
      />
      <Box sx={{ mt: 2 }}>
        <Button type='submit' variant='contained' color='primary' fullWidth>
          Create account
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

export default AccountForm;