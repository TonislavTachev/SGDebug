import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import EndpointItem from './EndpointItem';
import { Typography } from '@mui/material';
import BodyDetailsComponent from './BodyDetailsComponent';
import { fetchAllRequests, getRequest } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import NoFiles from './NoFiles';
import SGPagination from '../SGComponents/SGPagination';
const DataWrapper = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchAllRequests());
    // }, []);

    const classes = useStyles();

    const fetchedRequests = useSelector(({ requestReducer }) => requestReducer.get('requests'));

    const [selectedRequest, setSelectedRequest] = useState();
    const [openBody, setBodyOpenState] = useState(false);

    const fetchRequestAndExpandBody = (id) => {
        let individualRequest = fetchedRequests[id];
        dispatch(getRequest(individualRequest));
    };

    return (
        <div className={classes.wrapperContainer}>
            {fetchedRequests.length < 1 ? (
                <NoFiles />
            ) : (
                <div className={classes.dataWrapper}>
                    <div className={classes.endpointContainer}>
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
                    <SGPagination />
                </div>
            )}
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    wrapperContainer: {
        display: 'flex',
        flex: '4',
        flexDirection: 'row',
        width: '100%'
    },
    endpointContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        [theme.breakpoints.up('xl')]: {
            justifyContent: 'flex-start'
        }
    },
    dataWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        background: '#f4f4f4',
        height: '100%'
    }
}));

export default DataWrapper;
