import { useEffect, useState, useCallback } from 'react';
import {
  Typography,
  Paper,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { getAccounts, deleteAccount } from '../../services/api';
import { Account } from '../../types';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AccountForm from '../AccountForm';

const AccountList = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const handleDeleteModal = useCallback(
    (id: number | null) => {
      setSelectedAccount(
        id !== null
          ? accounts.find((account) => account.id === id) || null
          : null
      );
      setIsDialogOpen(!!id);
    },
    [accounts]
  );

  const handleDelete = useCallback(async () => {
    if (selectedAccount) {
      try {
        await deleteAccount(selectedAccount.id);
        setAccounts((prevAccounts) =>
          prevAccounts.filter((account) => account.id !== selectedAccount.id)
        );
        handleDeleteModal(null);
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  }, [selectedAccount, handleDeleteModal]);

  const handleEditModal = useCallback((account: Account | null) => {
    setSelectedAccount(account);
    setIsEditDialogOpen(!!account);
  }, []);

  const handleSaveEdit = useCallback(
    (updatedAccount: Account) => {
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === updatedAccount.id ? updatedAccount : account
        )
      );
      handleEditModal(null);
    },
    [handleEditModal]
  );

  return (
    <Box sx={{ p: '1rem' }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Account list
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
        }}
      >
        {!accounts.length ? (
          <Typography>No accounts available</Typography>
        ) : (
          accounts
            .slice()
            .reverse()
            .map((account) => (
              <Paper
                key={account.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  p: '1rem',
                  m: '1rem 0',
                }}
              >
                <Typography>
                  Owner ID: {account.ownerId}, Currency: {account.currency},
                  Balance: {account.balance}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    mt: 'auto',
                  }}
                >
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => handleEditModal(account)}
                    sx={{ width: '100%' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='outlined'
                    color='secondary'
                    onClick={() => handleDeleteModal(account.id)}
                    sx={{ width: '100%' }}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            ))
        )}
      </Box>
      <DeleteConfirmationModal
        open={isDialogOpen}
        onClose={() => handleDeleteModal(null)}
        onConfirm={handleDelete}
      />
      <Dialog
        open={isEditDialogOpen}
        onClose={() => handleEditModal(null)}
        maxWidth='xs'
        fullWidth
      >
        <DialogTitle sx={{ p: '2rem', pb: '0.5rem' }}>Edit account</DialogTitle>
        <DialogContent sx={{ p: '2rem' }}>
          <AccountForm
            currentAccount={selectedAccount || undefined}
            onSave={handleSaveEdit}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AccountList;
