import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const SGModal = ({ handleClose, open, dialogContent, hasLogFiles, handleSave }) => {
    const classes = useStyles();
    return (
        <Dialog onClose={handleClose} open={open} classes={classes.root} disableEscapeKeyDown>
            <DialogTitle>Upload log files</DialogTitle>
            <DialogContent>{dialogContent}</DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} disabled={!hasLogFiles}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

export default SGModal;
