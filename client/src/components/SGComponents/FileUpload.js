import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, styled } from '@mui/styles';
import { Grid, Paper } from '@mui/material';

const FileUploadModalContent = ({
    handleFileChange,
    selectedFile,
    translate,
    hasAdditionalMessage,
    validationError,
    imageDimensions,
    imageFormats
}) => {
    const classes = useStyles();

    return (
        <StyledContent container item>
            <div className='drop-area'>
                <div className='info'>
                    {'Drop files here'}
                    <br />
                    {'or'}
                    <br />
                    <span className='choose-file'>{'Choose file from your computer'}</span>
                    <input
                        className='file-input'
                        type='file'
                        multiple
                        onChange={handleFileChange}
                        title=''
                    />
                </div>
            </div>
            {hasAdditionalMessage && (
                <div className={classes.additionalInfoText}>
                    {`Supported formats ${imageFormats}. Size ${imageDimensions}`}
                </div>
            )}
            {validationError && <div className={classes.error}>{validationError}</div>}
            {selectedFile && (
                <FileMetaData elevation={0}>
                    <div className='file-info-wrapper'>
                        <span>{selectedFile.name}</span>
                    </div>
                </FileMetaData>
            )}
        </StyledContent>
    );
};

const StyledContent = styled(Grid)({
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    width: '500px !important',
    height: '200px',
    '& .drop-area': {
        position: 'relative',
        display: 'flex',
        flex: '1',
        height: '130px',
        minHeight: '130px',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px dashed #CCCCCC',
        borderRadius: '13px',
        '& .info': {
            margin: 'auto',
            '& .choose-file': {
                color: '#6C9CA0'
            },
            '& .file-input': {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: 'calc(100% - 20px)',
                opacity: 0,
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        }
    },
    '& .error': {
        color: 'red'
    }
});

const FileMetaData = styled(Paper)({
    display: 'flex',
    padding: '12px',
    flex: '1',
    background: '#F5F5F5 0% 0% no-repeat padding-box',
    border: '1px solid #D7D6D6',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .file-info-wrapper': {
        display: 'flex',
        alignItems: 'center',
        '& span': {
            width: 'fit-content',
            color: '#595959',
            wordBreak: 'break-word',
            marginLeft: '14px'
        }
    },
    '& .icon-hoverable': {
        cursor: 'pointer',
        color: '#595959'
    }
});

const useStyles = makeStyles((theme) => ({
    additionalInfoText: {
        marginTop: '10px',
        color: '#ACA9A9',
        fontSize: '12px',
        textAlign: 'center'
    },
    error: {
        display: 'flex',
        justifyContent: 'center',
        color: 'red',
        fontSize: '12px'
    }
}));

FileUploadModalContent.propTypes = {
    handleFileChange: PropTypes.func,
    translate: PropTypes.func,
    selectedFile: PropTypes.object,
    hasAdditionalMessage: PropTypes.bool,
    imageDimensions: PropTypes.string,
    imageFormats: PropTypes.string,
    validationError: PropTypes.string
};

FileUploadModalContent.defaultProps = {
    hasAdditionalMessage: false,
    imageDimensions: '',
    imageFormats: ''
};

export default FileUploadModalContent;