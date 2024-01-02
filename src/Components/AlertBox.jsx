import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertBox({open, onHandleClose, errorMsg}) {

  return (
    <React.Fragment>
        <Dialog
            open={open}
            onClose={onHandleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Error"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {errorMsg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onHandleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  );
}