import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import EndpointItem from './EndpointItem';
import { Typography } from '@mui/material';
import BodyDetailsComponent from './BodyDetailsComponent';
import { fetchAllRequests, getRequest } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';

const DataWrapper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllRequests());
    }, []);

    const classes = useStyles();

    const fetchedRequests = useSelector(({ requestReducer }) => requestReducer.get('requests'));

    const [selectedRequest, setSelectedRequest] = useState();
    const [openBody, setBodyOpenState] = useState(false);

    if (fetchedRequests.length === 0) {
        return 'Loading';
    }

    const fetchRequestAndExpandBody = (id) => {
        let individualRequest = fetchedRequests[id];
        dispatch(getRequest(individualRequest));
    };

    return (
        <div className={classes.wrapperContainer}>
            <div className={classes.endpointContainer}>
                <Typography
                    sx={{
                        marginTop: '5px',
                        marginLeft: '5px',
                        marginBottom: '10px',
                        fontWeight: 600
                    }}
                >
                    Requests
                </Typography>
                {fetchedRequests.length > 0 &&
                    fetchedRequests.map((item, index) => {
                        return (
                            <EndpointItem
                                endpointName={
                                    item.body.hasOwnProperty('method')
                                        ? item.body.method
                                        : 'No method name'
                                }
                                key={`${item._id}-${index}`}
                                requestIndex={index}
                                time={item.time}
                                date={item.date}
                                endpointType={'impl-generali-insurance'}
                                isError={item.isError}
                                fetchRequestAndExpandBody={fetchRequestAndExpandBody}
                            />
                        );
                    })}
            </div>
            <div className={classes.detailsContainer}>
                <Typography
                    sx={{
                        marginTop: '5px',
                        marginLeft: '5px',
                        marginBottom: '10px',
                        fontWeight: 600
                    }}
                >
                    Details
                </Typography>
                <BodyDetailsComponent isBodyOpened={openBody} />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    wrapperContainer: {
        display: 'flex',
        flex: '4',
        flexDirection: 'row',
        background: '#f4f4f4',
        height: '100%',
        padding: '20px'
    },
    endpointContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    detailsContainer: {
        marginLeft: '30px',
        marginRight: '30px',
        width: '100%'
    }
}));

export default DataWrapper;
