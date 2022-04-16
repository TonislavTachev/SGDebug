import React, { useState, useEffect } from 'react';
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
import { uploadFiles, filterRequests, fetchAllRequests } from '../../actions/actions';
import IsLoadingHoc from '../../customHooks/LoaderHOC';

const Sidebar = ({ setLoading }) => {
    const classes = useStyles();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validationError, setErrors] = useState('');
    const [filesToUpload, setFilesToUpload] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();

    const filesUploaded = useSelector(({ fileReducer }) => fileReducer.get('filesUploaded'));
    const uploadedFiles = useSelector(({ requestReducer }) => requestReducer.get('fileNames'));
    const requestFilters = useSelector(({ requestReducer }) => requestReducer.get('filters'));
    const requests = useSelector(({ requestReducer }) => requestReducer.get('requests'));

    const openFileUploadModal = () => {
        setModalOpen(true);
    };

    const handleFileChange = async (event) => {
        if (event.target.files.length <= 3) {
            setFilesToUpload(event.target.files);

            Array.from(event.target.files).forEach((file, index) => {
                setSelectedFiles((prevFiles) => [...prevFiles, file.name]);
            });
            setErrors('');
        } else {
            setErrors('Exceeded maximum file upload: 3');
        }
    };

    const closeUploadModal = (event, reason) => {
        setModalOpen(false);
        setSelectedFiles([]);
    };

    const saveAndUploadFiles = () => {
        let formData = new FormData();

        Array.from(filesToUpload).forEach((file, index) => {
            formData.append('files', file);
        });
        dispatch(uploadFiles(formData));
        setLoading(true);
        setModalOpen(false);
    };

    useEffect(() => {
        let dateRangeSelected = requestFilters.get('range').every((item) => item !== null);
        let isTimeEntered = requestFilters.get('time').every((value, key) => value !== '');

        if (dateRangeSelected && isTimeEntered) {
            dispatch(filterRequests(requestFilters));
        }
    }, [requestFilters]);

    console.log(filesUploaded);

    useEffect(() => {
        if (filesUploaded) {
            setTimeout(() => {
                dispatch(fetchAllRequests());
            }, 2000);
            setLoading(false);
        }
    }, [filesUploaded]);

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
                    {uploadedFiles.length > 0 &&
                        uploadedFiles.map((item, index) => {
                            return <FileItem fileName={item.logFileOrigin.slice(0, 25)} />;
                        })}
                </div>
            </div>
            {isModalOpen && (
                <SGModal
                    open={isModalOpen}
                    handleClose={closeUploadModal}
                    handleSave={saveAndUploadFiles}
                    hasLogFiles={selectedFiles.length > 0}
                    dialogContent={
                        <FileUpload
                            handleFileChange={handleFileChange}
                            selectedFiles={selectedFiles}
                            validationError={validationError}
                        />
                    }
                />
            )}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    wrapperContainer: {
        height: '100%',
        flex: '1',
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

export default IsLoadingHoc(Sidebar, "Please wait, we're processing your files");
