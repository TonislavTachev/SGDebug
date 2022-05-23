import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import EndpointItem from './EndpointItem';
import { Typography } from '@mui/material';
import { fetchAllRequests, getRequest, setField } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import NoFiles from './NoFiles';
import SGPagination from '../SGComponents/SGPagination';
import SGModal from '../SGComponents/SGModal';
import BodyDetailsComponent from './DetailsModal';
import ChipNavigation from './ChipNavigation';
import SGSwitch from '../SGComponents/SGSwitch';

const DataWrapper = () => {
    const dispatch = useDispatch();

    const classes = useStyles();

    const fetchedRequests = useSelector(({ requestReducer }) => requestReducer.get('requests'));
    const selectedStateRequest = useSelector(({ requestReducer }) => requestReducer.get('request'));
    const page = useSelector(({ requestReducer }) => requestReducer.getIn(['pagination', 'page']));
    const selectedStateChip = useSelector(({ requestReducer }) =>
        requestReducer.getIn(['filters', 'types'])
    );
    const selectedMethodName = useSelector(({ requestReducer }) =>
        requestReducer.get('selectedDistinctName')
    );

    const [isModalOpen, setModalOpen] = useState(false);

    const [selectedRequest, setSelectedRequest] = useState();
    const [openBody, setBodyOpenState] = useState(false);

    const fetchRequestAndExpandBody = (id) => {
        let individualRequest = fetchedRequests[id];
        setModalOpen(true);
        dispatch(getRequest(individualRequest));
    };

    const closeDetailsModal = () => {
        setModalOpen(false);
        dispatch(setField({ path: ['tracedRequest'], value: {} }));
        dispatch(setField({ path: ['isRequestTraced'], value: false }));
    };

    useEffect(() => {
        dispatch(fetchAllRequests(page, selectedStateChip, selectedMethodName));
    }, [page, dispatch]);

    return (
        <div className={classes.wrapperContainer}>
            {fetchedRequests.size < 1 ? (
                <NoFiles />
            ) : (
                <div className={classes.dataWrapper}>
                    <ChipNavigation />
                    <div className={classes.endpointContainer}>
                        {fetchedRequests.length > 0 &&
                            fetchedRequests.map((item, index) => {
                                return (
                                    <EndpointItem
                                        type={item}
                                        key={`${item._id}-${index}`}
                                        requestIndex={index}
                                        time={item.time}
                                        date={item.date}
                                        endpointType={'impl-generali-insurance'}
                                        isError={item.mtid === 'error'}
                                        fetchRequestAndExpandBody={fetchRequestAndExpandBody}
                                    />
                                );
                            })}
                    </div>
                    <SGPagination />
                    <SGModal
                        open={isModalOpen}
                        handleClose={closeDetailsModal}
                        dialogContent={
                            <BodyDetailsComponent selectedRequest={selectedStateRequest} />
                        }
                        hasActions={false}
                        dialogFullScreenTitle={selectedStateRequest}
                        isFullScreen
                    />
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
            justifyContent: 'flex-start',
            marginLeft: '74px'
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
