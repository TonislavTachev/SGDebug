import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FileIcon from '../../assets/icons/file.png';
import LinearProgress from '@mui/material/LinearProgress';

const FileItem = ({ fileName }) => {
    const classes = useStyles();

    return (
        <div className={classes.fileWrapper}>
            <div className={classes.iconWrapper}>
                <img src={FileIcon} alt='File icon' className={classes.icon} />
            </div>
            <div className={classes.progressAndName}>
                <Typography>{fileName}</Typography>
                <LinearProgress value={50} />
            </div>
            <div className={classes.removeItem}>
                <HighlightOffIcon />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    fileWrapper: {
        width: '100%',
        height: '60px',
        background: '#f4f4f4',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: '15px',
        borderRadius: '14px'
    },
    icon: {
        width: '32px'
    },
    iconWrapper: {
        marginTop: '10px'
    },
    progressAndName: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '-10px'
    },
    removeItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: 'pointer'
    }
}));

export default FileItem;
