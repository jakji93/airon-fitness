import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import React, { createContext, useCallback, useState } from 'react';

export const ToastContext = createContext();

export default function Toast(props) {
  const {
    children,
  } = props;
  const [open, setOpen] = useState(false);
  const [autoHideDuration, setautoHideDuration] = useState(6000);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const openToast = useCallback((_severity = 'success', _message = '', _autoHideDuration = 6000) => {
    setautoHideDuration(_autoHideDuration);
    setSeverity(_severity);
    setMessage(_message);
    setOpen(true);
  }, [autoHideDuration, severity, message, open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <ToastContext.Provider value={openToast}>
        {children}
      </ToastContext.Provider>
    </>
  );
}

Toast.propTypes = {
  children: PropTypes.node.isRequired,
};
