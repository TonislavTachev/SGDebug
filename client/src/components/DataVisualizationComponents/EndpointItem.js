import React from 'react';
import { makeStyles } from '@mui/styles';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorIcon from '../../assets/icons/error.png';
import { Typography } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants';

const EndpointItem = ({
    time,
    endpointName,
    endpointType,
    isError,
    requestIndex,
    fetchRequestAndExpandBody
}) => {
    const classes = useStyles();

    const formatTime = (timeToFormat) => {
        return `${format(new Date(timeToFormat), TIME_FORMAT)}`;
    };

    const formatDate = (dateToFormat) => {
        return `${format(new Date(dateToFormat), DATE_FORMAT)}`;
    };

    return (
        <div
            className={classes.endpointWrapper}
            style={isError ? { border: '1px solid #ff2626' } : {}}
            onClick={() => fetchRequestAndExpandBody(requestIndex)}
        >
            {isError && (
                <img
                    src={ErrorIcon}
                    className={classes.errorIcon}
                    alt='Icon indicating the request was an error'
                />
            )}
            <div
                className={classes.timeAndDateWrapper}
                style={isError ? { background: 'rgb(255 38 38 / 50%)', color: '#FFF' } : {}}
            >
                <div className={classes.timeWrapper}>
                    <AccessTimeIcon className={classes.icon} />
                    <Typography sx={{ marginTop: '5px', marginLeft: '5px', fontWeight: 600 }}>
                        {formatTime(time)}
                    </Typography>
                </div>
                <div className={classes.dateWrapper}>
                    <EventIcon className={classes.icon} />
                    <Typography sx={{ marginTop: '5px', marginLeft: '5px', fontWeight: 600 }}>
                        {formatDate(time)}
                    </Typography>
                </div>
            </div>
            <div className={classes.nameAndTypeWrapper}>
                <div className={classes.endpointNameWrapper}>
                    <Typography sx={{ marginLeft: '5px', color: '#b1abab' }}>Name</Typography>
                    <Typography sx={{ marginLeft: '5px', marginBottom: '5px' }}>
                        {endpointName}
                    </Typography>
                </div>
                <div className={classes.endpointNameWrapper}>
                    <Typography sx={{ marginLeft: '5px', color: '#b1abab' }}>Type</Typography>
                    <Typography sx={{ marginLeft: '5px' }}>{endpointType}</Typography>
                </div>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    endpointWrapper: {
        display: 'flex',
        flexDirection: 'row',
        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;',
        width: '450px',
        height: '105px',
        borderRadius: '16px',
        marginBottom: '16px',
        backgroundColor: '#FFF',
        position: 'relative',
        cursor: 'pointer'
    },
    timeAndDateWrapper: {
        background: '#7eccff',
        borderRadius: '16px 0px 0px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '80px',
        paddingLeft: '5px'
    },
    dateWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '15px'
    },
    timeWrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    icon: {
        marginTop: '5px'
    },
    nameAndTypeWrapper: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '5px'
    },
    errorIcon: {
        position: 'absolute',
        right: '-10px',
        top: '-9px',
        height: '22px'
    }
}));

export default EndpointItem;
