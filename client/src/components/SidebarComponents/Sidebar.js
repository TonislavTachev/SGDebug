import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import SGLogo from '../../assets/logo/download.png';
import { Typography } from '@mui/material';
import UploadFileComponent from './UploadFileComponent';
import SGCalendar from './SGCalendar';
import TimeComponent from './TimeComponent';
import FileItem from './FileItem';
import SGModal from '../SGComponents/SGModal';
import FileUpload from '../SGComponents/FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles } from '../../actions/actions';

const Sidebar = ({ setLoading }) => {
    const classes = useStyles();
    const [selectedFiles, setSelectedFile] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();

    const uploadedFiles = useSelector(({ fileReducer }) => fileReducer.get('uploadedFiles'));

    const openFileUploadModal = () => {
        setModalOpen(true);
    };

    const handleFileChange = async (event) => {
        let data = new FormData();
        data.append('file', event.target.files[0]);

        dispatch(uploadFiles(data));
    };

    return (
        <div className={classes.wrapperContainer}>
            <div className={classes.headerWrapper}>
                <div className={classes.imageWrapper}>
                    <img src={SGLogo} alt='Logo of company' className={classes.logo} />
                </div>
                <div className={classes.textWrapper}>
                    <Typography className={classes.logoText}>SG Debug</Typography>
                </div>
            </div>
            <div className={classes.uploadWrapper}>
                <UploadFileComponent openFileUploadModal={openFileUploadModal} />
            </div>
            <div className={classes.dateWrapper}>
                <Typography
                    sx={{
                        textAlign: 'center',
                        marginTop: '10px',
                        marginBottom: '15px',
                        fontWeight: 600
                    }}
                >
                    Select date and time you wish to trace
                </Typography>
                <SGCalendar />
            </div>
            <div className={classes.timeWrapper}>
                <TimeComponent />
            </div>
            <div className={classes.uploadedFiles}>
                <Typography
                    sx={{
                        marginTop: '10px',
                        marginBottom: '15px',
                        fontWeight: 600
                    }}
                >
                    Uploaded log files
                </Typography>
                <div className={classes.uploadedFilesWrapper}>
                    {uploadedFiles.map((item, index) => {
                        return <FileItem fileName={item.fileName} />;
                    })}
                </div>
            </div>
            {isModalOpen && (
                <SGModal
                    open={isModalOpen}
                    handleClose={() => setModalOpen(false)}
                    dialogContent={<FileUpload handleFileChange={handleFileChange} />}
                />
            )}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    wrapperContainer: {
        height: '100%',
        flex: '1',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
        padding: '20px'
    },
    headerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
    logo: {
        height: '80px',
        width: '80px'
    },
    textWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoText: {
        fontSize: '35px !important'
    },
    uploadWrapper: {
        marginTop: '20px'
    },
    dateWrapper: {
        marginTop: '20px'
    },
    timeWrapper: {
        marginTop: '20px'
    },
    uploadedFiles: {
        marginTop: '30px'
    },
    uploadedFilesWrapper: {
        maxHeight: '230px'
    }
}));

export default Sidebar;
