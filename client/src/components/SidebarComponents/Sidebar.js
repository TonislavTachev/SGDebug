import React, { useState, useEffect, useMemo } from 'react';
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
import {
    uploadFiles,
    filterRequests,
    fetchAllRequests,
    removeLogFile,
    setField,
    clearFilters
} from '../../actions/actions';
import IsLoadingHoc from '../../customHooks/LoaderHOC';
import SGSnackbar from '../SGComponents/SGSnackbar';
import usePrevious from '../../customHooks/prevHook';
import MethodNameInput from './MethodNameInput';
import { fromJS } from 'immutable';

const Sidebar = ({ setLoading }) => {
    const classes = useStyles();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validationError, setErrors] = useState('');
    const [filesToUpload, setFilesToUpload] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [snackBarState, setSnackbarState] = useState(true);

    const dispatch = useDispatch();

    const filesUploaded = useSelector(({ fileReducer }) => fileReducer.get('filesUploaded'));
    const uploadedFiles = useSelector(({ requestReducer }) => requestReducer.get('fileNames'));
    const requestFilters = useSelector(({ requestReducer }) => requestReducer.get('filters'));
    const requests = useSelector(({ requestReducer }) => requestReducer.get('requests'));
    const isFileRemoved = useSelector(({ requestReducer }) => requestReducer.get('fileRemoved'));
    const isError = useSelector(({ requestReducer }) => requestReducer.get('errorState'));
    const page = useSelector(({ requestReducer }) => requestReducer.getIn(['pagination', 'page']));
    const selectedStateChip = useSelector(({ requestReducer }) =>
        requestReducer.getIn(['filters', 'types'])
    );
    const selectedMethodName = useSelector(({ requestReducer }) =>
        requestReducer.get('selectedDistinctName')
    );
    const isLoading = useSelector(({ requestReducer }) => requestReducer.get('isLoading'));

    const prevSelectedChip = usePrevious(selectedStateChip);
    const prevMethodName = usePrevious(selectedMethodName);

    const openFileUploadModal = () => {
        setModalOpen(true);
    };

    const items = [
        { logFileOrigin: 'impl-generali-insurance08032022' },
        { logFileOrigin: 'impl-generali-insurance08032022' },
        { logFileOrigin: 'impl-generali-insurance08032022' },
        { logFileOrigin: 'impl-generali-insurance08032022' },
        { logFileOrigin: 'impl-generali-insurance08032022' },
        { logFileOrigin: 'impl-generali-insurance08032022' },
        { logFileOrigin: 'impl-generali-insurance08032022' },
        { logFileOrigin: 'impl-generali-insurance08032022' }
    ];

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

    const closeUploadModal = () => {
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

    const removeFile = (fileName, fileIndex) => {
        setLoading(true);
        dispatch(removeLogFile(fileName, fileIndex));
    };

    const handleSnackbarClose = () => {
        setSnackbarState(false);
    };

    const dateRangeSelected = useMemo(
        () => requestFilters.get('range').every((item) => item !== null),
        [requestFilters]
    );

    useEffect(() => {
        if (
            requestFilters.get('time').get('from') &&
            requestFilters.get('time').get('to') &&
            dateRangeSelected
        ) {
            const timerId = setTimeout(() => {
                dispatch(
                    fetchAllRequests(page, selectedStateChip, selectedMethodName, requestFilters)
                );
            }, 1000);

            return () => {
                clearTimeout(timerId);
            };
        }
    }, [dateRangeSelected, requestFilters.get('time')]);

    useEffect(() => {
        if (filesUploaded === true) {
            const fetchDocumentsInterval = setInterval(
                dispatch(fetchAllRequests(page, selectedStateChip)),
                5000
            );

            if (requests.length > 0) {
                clearInterval(fetchDocumentsInterval);
                setLoading(false);
                dispatch(setField({ path: ['filesUploaded'], value: false }));
            }
        }
    }, [filesUploaded, requests]);

    useEffect(() => {
        if (isFileRemoved === true) {
            setLoading(false);
            dispatch(setField({ path: ['requests'], value: [] }));
        }
    }, [isFileRemoved]);

    useEffect(() => {
        if (prevSelectedChip !== undefined && prevSelectedChip !== selectedStateChip) {
            dispatch(clearFilters());
            dispatch(fetchAllRequests(1, selectedStateChip));
            dispatch(
                setField({
                    path: ['selectedDistinctName'],
                    value: fromJS({ label: '', value: '' })
                })
            );
            dispatch(setField({ path: ['pagination', 'page'], value: 1 }));
        }
    }, [selectedStateChip]);

    useEffect(() => {
        if (prevMethodName !== undefined) {
            dispatch(fetchAllRequests(page, selectedStateChip, selectedMethodName));
        }
    }, [selectedMethodName]);

    useEffect(() => {
        dispatch(fetchAllRequests(page, selectedStateChip));
    }, []);

    useEffect(() => {
        if (isLoading !== undefined || isLoading !== null) {
            setLoading(true);
        }

        if (isLoading === false) {
            setLoading(false);
        }
    }, [isLoading]);

    return (
        <div className={classes.wrapperContainer}>
            {isError !== '' && <SGSnackbar open severity='error' message={isError} />}
            {isFileRemoved && (
                <SGSnackbar
                    open={snackBarState}
                    severity='success'
                    handleClose={handleSnackbarClose}
                    message={'Successfully deleted log file'}
                />
            )}
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
                            return (
                                <FileItem
                                    fileName={item.logFileOrigin.slice(0, 25)}
                                    originalFilename={item.logFileOrigin}
                                    fileIndex={index}
                                    removeFile={removeFile}
                                />
                            );
                        })}
                </div>
            </div>
            {isModalOpen && (
                <SGModal
                    open={isModalOpen}
                    handleClose={closeUploadModal}
                    handleSave={saveAndUploadFiles}
                    hasLogFiles={selectedFiles.length > 0}
                    dialogTitle='Upload log files'
                    hasActions
                    isFullScreen={false}
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
        maxWidth: '310px',
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
    uploadedFilesWrapper: {}
}));

export default IsLoadingHoc(Sidebar, "Please wait, we're processing your files");
