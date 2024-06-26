import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from '@mui/material';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperProps={{
        sx: { minWidth: '300px' },
      }}
    >
      <DialogTitle id='alert-dialog-title' sx={{ p: '2rem', pb: '0.5rem' }}>
        Delete account confirmation
      </DialogTitle>
      <DialogContent sx={{ p: '2rem 2rem 0 2rem' }}>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete this account?
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          padding: '0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            width: '100%',
            p: '2rem',
            pt: '1.5rem',
          }}
        >
          <Button onClick={onClose} variant='outlined' sx={{ width: '48%' }}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant='contained'
            color='secondary'
            sx={{ width: '48%' }}
          >
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
