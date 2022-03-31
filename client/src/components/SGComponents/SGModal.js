import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles';

const SGModal = ({ handleClose, open, dialogContent }) => {
    const classes = useStyles();
    return (
        <Dialog onClose={handleClose} open={open} classes={classes.root}>
            <DialogTitle>Upload log files</DialogTitle>
            <DialogContent>{dialogContent}</DialogContent>
        </Dialog>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {}
}));

export default SGModal;
