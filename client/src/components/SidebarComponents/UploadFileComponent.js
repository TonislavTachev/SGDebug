import React from 'react';
import { makeStyles } from '@mui/styles';
import UploadIcon from '../../assets/icons/upload.png';
import { Typography } from '@mui/material';

const UploadFileComponent = ({ openFileUploadModal }) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapperContainer} onClick={openFileUploadModal}>
            <div className={classes.openFileUploadWrapper}>
                <div className={classes.fileUploadText}>
                    <Typography sx={{ marginLeft: '-8px ', marginBottom: '10px', fontWeight: 600 }}>
                        Insert your log files here
                    </Typography>
                </div>
                <div className={classes.uploadImageWrapper}>
                    <img src={UploadIcon} alt='Upload file' className={classes.image} />
                </div>
                <div className={classes.fileUploadText}>
                    <Typography sx={{ marginTop: '10px', fontWeight: 600 }}>
                        Accepted formats .txt
                    </Typography>
                </div>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    wrapperContainer: {
        display: 'flex',
        flexDirection: 'row',
        background: '#f4f4f4',
        height: '100%',
        padding: '10px',
        justifyContent: 'center',
        borderRadius: '40px',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
        cursor: 'pointer'
    },
    uploadImageWrapper: {
        marginLeft: '48px'
    },
    image: {
        height: '50px'
    }
}));

export default UploadFileComponent;
