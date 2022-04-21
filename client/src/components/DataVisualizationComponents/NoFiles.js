import React from 'react';
import FolderOffIcon from '@mui/icons-material/FolderOff';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';

const NoFiles = () => {
    const classes = useStyles();

    return (
        <div className={classes.noFilesWrapper}>
            <div className={classes.iconAndTextWrapper}>
                <Typography sx={{ fontSize: '30px' }}>No files currently imported </Typography>
                <FolderOffIcon sx={{ height: '150px', width: '150px', color: '#fd523f' }} />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    noFilesWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '10px'
    },
    iconAndTextWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        border: '2px dashed #c7c0c0',
        justifyContent: 'center',
        padding: '30px'
    }
}));

export default NoFiles;
