import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function UpdateConfirmationModal(props) {
  const {
    open,
    setOpen,
    onYes,
    dialogTitle,
    dialogContent,
  } = props;

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button
          onClick={() => {
            onYes();
            handleClose();
          }}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UpdateConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onYes: PropTypes.func.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogContent: PropTypes.string.isRequired,
};
