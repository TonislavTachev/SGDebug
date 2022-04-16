import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';

const SGModal = ({
    handleClose,
    open,
    dialogContent,
    hasLogFiles,
    handleSave,
    dialogTitle,
    hasActions,
    isFullScreen,
    dialogFullScreenTitle
}) => {
    const classes = useStyles();

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            fullScreen={isFullScreen}
            classes={classes.root}
            disableEscapeKeyDown
            maxWidth='lg'
        >
            {isFullScreen && (
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={handleClose}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                            {dialogFullScreenTitle.body.hasOwnProperty('method')
                                ? dialogFullScreenTitle.body.method
                                : 'No method name'}
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>{dialogContent}</DialogContent>
            {hasActions && (
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} disabled={!hasLogFiles}>
                        Save
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

SGModal.defaultProps = {
    handleSave: () => {}
};

export default SGModal;
