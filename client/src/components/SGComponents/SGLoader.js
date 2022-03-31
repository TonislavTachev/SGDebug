import React from 'react';
import { makeStyles } from '@mui/styles';
import './loader.css';
import { Backdrop, Typography } from '@mui/material';

const Loader = ({ shouldOpen, loadingMessage }) => {
    const classes = useStyles();
    return (
        <Backdrop className={classes.loaderWrapper} open={shouldOpen}>
            <div className='loader'></div>
            <Typography className={classes.loaderTextStyle}>{loadingMessage}</Typography>
        </Backdrop>
    );
};

const useStyles = makeStyles((theme) => ({
    loaderWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999'
    },

    loaderTextStyle: {
        fontSize: '18px',
        color: '#FFF'
    }
}));

export default Loader;
